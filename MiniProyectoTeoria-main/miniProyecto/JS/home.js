var numeroLlamadas = document.getElementById("numero-llamadas");
var precio = document.getElementById("precio-producto");
var datos;
var selectM = document.querySelector('#nn'); 
var selectN = document.querySelector('#tipo-ejercicios');

var llamadasBarras;
var ventasBarras;
var montosBarras;



function abrirModal() {
   $('#modal').modal('show');
}

function ocultarModal() {
   $('#modal').modal('hide');
}

function simular() {
   ocultarModal();
   let tipo = getTipoGrafica();
   setTipoGrafica(tipo);
   if (comprobarNumeroLlamadas() && comprobarPrecio()) {
      if (esEntero(numeroLlamadas.value)) {
         datos = hacerCalculos(numeroLlamadas.value, precio.value, selectN.value);
         graficar(numeroLlamadas.value, datos, tipo);
      } else {
         alert("El número de llamadas no puede ser un decimal!");
         return false;
      }
   } else {
      alert("Llene todos los campos");
      return false;
   }
}

function getTipoGrafica() {
   return document.getElementById("graficas").value;
}

function setTipoGrafica(tipo){
   $("#nn").val(tipo);
}

function comprobarNumeroLlamadas() {
   let valido;
   if (numeroLlamadas.value == "" || numeroLlamadas.value == null) {
      valido = false;
   } else {
      valido = true;
   }

   return valido;
}

function comprobarPrecio() {
   let valido;
   if (precio.value == "" || precio.value == null) {
      valido = false;
   } else {
      valido = true;
   }

   return valido;
}

function esEntero(numero) {
   let entero;
   if (numero % 1 == 0) {
      entero = true;
   } else {
      entero = false;
   }

   return entero;
}

function hacerCalculos(llamadas, precio, tipoDatos) {
   ocultarPrimario();
   mostrarSecundario();

   
   let llamadasContestadas = aproximarAEntero(getLlamadasContestadas(llamadas, tipoDatos));
   let llamadasContestadasQueEscuchan = aproximarAEntero(getLlamadasContestadasEscucharPromocion(llamadasContestadas, tipoDatos));
   let contesteMujer = aproximarAEntero(getProbabilidadContesteMujer(llamadasContestadas, tipoDatos));
   let ventaMujer = aproximarAEntero(getProbabilidadVentaMujer(contesteMujer, tipoDatos));

   let llamadasNoContestadas = llamadas - llamadasContestadas;
   let llamadasContestadasQueNoEscuchan = llamadasContestadas - llamadasContestadasQueEscuchan;
   let contesteHombre = llamadasContestadas - contesteMujer;
   let ventaHombre = aproximarAEntero(getProbabilidadVentaHombre(contesteHombre, tipoDatos));

   let montoVentasMujer = getMontoVentasMujeres(ventaMujer, precio, tipoDatos);
   let montoVentasHombre = getMontoVentasHombres(ventaHombre, precio, tipoDatos);

   let montoVentas = montoVentasMujer + montoVentasHombre;


   console.log("Llamadas realizadas --> " + llamadas);
   console.log("Precio --> " + precio);
   console.log("Llamadas contestadas --> " + llamadasContestadas);
   console.log("Llamadas NO contestadas --> " + llamadasNoContestadas);
   console.log("Llamadas contestadas que escuchan --> " + llamadasContestadasQueEscuchan);
   console.log("Llamadas contestadas que NO escuchan --> " + llamadasContestadasQueNoEscuchan);
   console.log("Llamadas contestadas por una mujer --> " + contesteMujer);
   console.log("Llamadas contestadas por un hombre --> " + contesteHombre);
   console.log("Ventas hechas a mujeres --> " + ventaMujer);
   console.log("Ventas hechas a hombre --> " + ventaHombre);
   console.log("Monto total de ventas hechas a mujeres --> " + montoVentasMujer);
   console.log("Monto total de ventas hechas a hombres--> " + montoVentasHombre);
   console.log("Monto total de ventas hechas --> " + montoVentas);

   return {
      "llamadasContestadas": llamadasContestadas,
      "llamadasNoContestadas": llamadasNoContestadas,
      "llamadasContestadasQueEscuchan": llamadasContestadasQueEscuchan,
      "llamadasContestadasQueNoEscuchan": llamadasContestadasQueNoEscuchan,
      "contesteMujer": contesteMujer,
      "contesteHombre": contesteHombre,
      "ventaMujer": ventaMujer,
      "ventaHombre": ventaHombre,
      "totalVentas": ventaHombre + ventaMujer,
      "montoVentasMujer": montoVentasMujer,
      "montoVentasHombre": montoVentasHombre,
      "montoVentas": montoVentas,
      "precio": precio
   }
}

function getLlamadasContestadas(llamadas, tipoDatos) {
   if(tipoDatos == 1){
      return 0.80 * llamadas;
   }else{
      return ((Math.random() * (0.80 - 0.60) + 0.60)*llamadas);
   }
}

function getLlamadasContestadasEscucharPromocion(llamadasContestadas, tipoDatos) {
   if(tipoDatos == 1)
      return 0.55 * llamadasContestadas;
   else
      return ((Math.random() * (0.55 - 0.40) + 0.40)*llamadasContestadas);
}

function getProbabilidadContesteMujer(llamadas, tipoDatos) {
   if(tipoDatos == 1)
      return 0.65 * llamadas;
   else
      return ((Math.random() * (0.65 - 0.50) + 0.50)*llamadas)
}

function getProbabilidadVentaMujer(llamadasContestadasMujer, tipoDatos) {
   if(tipoDatos == 1)
      return 0.16 * llamadasContestadasMujer;
   else
      return ((Math.random() * (0.16 - 0.09) + 0.09)*llamadasContestadasMujer);
}

function getProbabilidadVentaHombre(llamadasContestadasHombre, tipoDatos) {
   if(tipoDatos == 1)
      return 0.10 * llamadasContestadasHombre;
   else
      return ((Math.random() * (0.10 - 0.06) + 0.06)*llamadasContestadasHombre);
}

function getMontoVentasMujeres(numeroVentasMujer, precio, tipoDatos) {
   return numeroVentasMujer * precio;
}

function getMontoVentasHombres(numeroVentasHombre, precio, tipoDatos) {
   return numeroVentasHombre * precio;
}

function ocultarPrimario() {
   document.getElementById("principal").style.display = "none";
}

function mostrarSecundario() {
   document.getElementById("secundario").style.display = "block";
}

function recargar() {
   location.reload();
}

function aproximarAEntero(numero) {
   return Math.round(numero);
}

function graficar(numeroLlamadas, datos, tipo) {
   // tipo == 1 ? graficaDeBarras(numeroLlamadas, datos) : graficaCircular(numeroLlamadas, datos);
   graficaDeBarras(numeroLlamadas, datos);
   graficaCircular(numeroLlamadas, datos);
   tipo == 1 ? mostrarChartLlamadas() : mostrarChartLlamadasCircular();
}

function graficaDeBarras(numeroLlamadas, datos) {

   let tituloLlamadas = 'Llamadas(' + numeroLlamadas + ')';

   let ctxLlamadas = document.getElementById('chart-llamadas').getContext('2d');
   let chartLlamadas = new Chart(ctxLlamadas, {
      type: 'bar',
      data: {
         labels: ['Hechas', 'Contestadas', 'NO contestadas', 'Contestadas (escuchan)', 'Contestadas (NO escuchan)'
            , 'Contestadas (hombres)', 'Contestadas (mujeres)'],
         datasets: [{
            label: tituloLlamadas,
            data: [numeroLlamadas, datos["llamadasContestadas"], datos["llamadasNoContestadas"],
               datos["llamadasContestadasQueEscuchan"], datos["llamadasContestadasQueNoEscuchan"],
               datos["contesteHombre"], datos["contesteMujer"]],
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)',
               'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
         }]
      },
      options: {
         scales: {
            yAxes: [{
               ticks: {
                  beginAtZero: true
               }
            }]
         }
      }
   });

   let ctxVentas = document.getElementById('chart-ventas').getContext('2d');
   let chartVentas = new Chart(ctxVentas, {
      type: 'bar',
      data: {
         labels: ['Ventas hechas', 'Ventas (hombres)', 'Ventas (mujeres)'],
         datasets: [{
            label: 'VENTAS(' + datos["totalVentas"] + ')',
            data: [datos["totalVentas"], datos["ventaHombre"], datos["ventaMujer"]],
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
         }]
      },
      options: {
         scales: {
            yAxes: [{
               ticks: {
                  beginAtZero: true
               }
            }]
         }
      }
   });

   let ctxMontos = document.getElementById('chart-montos').getContext('2d');
   let chartMontos = new Chart(ctxMontos, {
      type: 'bar',
      data: {
         labels: ['Monto total', 'Monto (hombres)', 'Monto (mujeres)'],
         datasets: [{
            label: `MONTOS (${datos["precio"]} por celular)`,
            data: [datos["montoVentas"], datos["montoVentasHombre"], datos["montoVentasMujer"]],
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
         }]
      },
      options: {
         scales: {
            yAxes: [{
               ticks: {
                  beginAtZero: true
               }
            }]
         }
      }
   });


   // mostrarChartLlamadas();
}

function graficaCircular(numeroLlamadas, datos) {
   let ctxLlamadasCircular = document.getElementById("chart-llamadas-circular");
   let dataLlamadas = {
      datasets: [{
         data: [
            datos["llamadasContestadas"], datos["llamadasNoContestadas"],
            datos["llamadasContestadasQueEscuchan"], datos["llamadasContestadasQueNoEscuchan"],
            datos["contesteHombre"], datos["contesteMujer"]
         ],
         backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
         ],
         borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
         ],
         borderWidth: 1
      }],
      labels: [
         'Contestadas', 'NO contestadas', 'Contestadas (escuchan)', 'Contestadas (NO escuchan)'
         , 'Contestadas (hombres)', 'Contestadas (mujeres)'
      ]
   };


   let myPieChartLlamadas = new Chart(ctxLlamadasCircular, {
      type: 'pie',
      data: dataLlamadas
   });

   // ---------------------------------------------------------------------

   let ctxVentasCircular = document.getElementById("chart-ventas-circular");
   let dataVentas = {
      datasets: [{
         data: [
            datos["ventaHombre"], datos["ventaMujer"]
         ],
         backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
         ],
         borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
         ],
         borderWidth: 1
      }],
      labels: [
         'Ventas (hombres)', 'Ventas (mujeres)'
      ]
   };


   let myPieChartVentas = new Chart(ctxVentasCircular, {
      type: 'pie',
      data: dataVentas
   });

   // -------------------------------------------------------------------
   let ctxMontosCircular = document.getElementById("chart-montos-circular");
   let dataMontos = {
      datasets: [{
         data: [
            datos["montoVentasHombre"], datos["montoVentasMujer"]
         ],
         backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
         ],
         borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
         ],
         borderWidth: 1
      }],
      labels: [
         'Monto (hombres)', 'Monto (mujeres)'
      ]
   };


   let myPieChartMontos = new Chart(ctxMontosCircular, {
      type: 'pie',
      data: dataMontos
   });

   // mostrarChartLlamadasCircular();
}

function verVentas() {
   console.log(selectM.value);
   llamadasBarras = 0;
   ventasBarras = 1;
   montosBarras = 0;
   if(selectM.value == 1) {
      ocultarChartLlamadas();
      ocultarMontos();
      ocultarChartLlamadasCircular();
      ocultarChartMontosCircular();
      ocultarChartVentasCircular();
      mostrarChartVentas();
   }else{
      verVentasCircular();
   }
}

function verLlamadas() {
   console.log(selectM.value);
   llamadasBarras = 1;
   ventasBarras = 0;
   montosBarras = 0;
   if(selectM.value == 1) {
      ocultarChartVentas();
      ocultarMontos();
      ocultarChartLlamadasCircular();
      ocultarChartVentasCircular();
      ocultarChartMontosCircular();
      mostrarChartLlamadas();
   }else{
      verLlamadasCircular();
   }
}

function verMontos() {
   console.log(selectM.value);
   llamadasBarras = 0;
   ventasBarras = 0;
   montosBarras = 1;
   if(selectM.value == 1) {
      ocultarChartLlamadas();
      ocultarChartVentas();
      ocultarChartLlamadasCircular();
      ocultarChartVentasCircular();
      ocultarChartMontosCircular();
      mostrarMontos();
   }else{
      verMontosCircular();
   }
}

function verLlamadasCircular() {
   llamadasBarras = 1;
   ventasBarras = 0;
   montosBarras = 0;
   if(selectM.value == 2){
      ocultarChartLlamadas();
      ocultarChartVentas();
      ocultarMontos();
      ocultarChartMontosCircular();
      ocultarChartVentasCircular();
      mostrarChartLlamadasCircular();
   }else{
      verLlamadas();
   }
}

function verVentasCircular(){
   llamadasBarras = 0;
   ventasBarras = 1;
   montosBarras = 0;
   if(selectM.value == 2){
      ocultarChartLlamadas();
      ocultarChartVentas();
      ocultarMontos();
      ocultarChartLlamadasCircular();
      ocultarChartMontosCircular();
      mostrarChartVentasCircular();
   }else{
      verVentas();
   }
}

function verMontosCircular(){
   llamadasBarras = 0;
   ventasBarras = 0;
   montosBarras = 1;
   if(selectM.value == 2){
      ocultarChartLlamadas();
      ocultarChartLlamadasCircular();
      ocultarChartVentasCircular();
      ocultarChartVentas();
      ocultarMontos();
      mostrarChartMontosCircular();
   }else{
      verMontos();
   }
}

function ocultarChartLlamadas() {
   document.getElementById("chart-llamadas").style.display = "none";
}

function mostrarChartVentas() {
   document.getElementById("chart-ventas").style.display = "block";
}

function mostrarChartLlamadas() {
   document.getElementById("chart-llamadas").style.display = "block";
}

function ocultarChartVentas() {
   document.getElementById("chart-ventas").style.display = "none";
}

function mostrarMontos() {
   document.getElementById("chart-montos").style.display = "block";
}

function ocultarMontos() {
   document.getElementById("chart-montos").style.display = "none";
}

function mostrarChartLlamadasCircular() {
   document.getElementById("chart-llamadas-circular").style.display = "block";
}

function ocultarChartLlamadasCircular() {
   document.getElementById("chart-llamadas-circular").style.display = "none";
}

function mostrarChartVentasCircular(){
   document.getElementById("chart-ventas-circular").style.display = "block";
}

function ocultarChartVentasCircular(){
   document.getElementById("chart-ventas-circular").style.display = "none";
}

function mostrarChartMontosCircular(){
   document.getElementById("chart-montos-circular").style.display = "block";
}

function ocultarChartMontosCircular(){
   document.getElementById("chart-montos-circular").style.display = "none";
}

selectM.addEventListener('change', actualizar);

function actualizar(e){
   console.log(llamadasBarras);
   console.log(ventasBarras);
   console.log(montosBarras);

   let valorActual = e.target.value;
   console.log(valorActual);
   if(valorActual == 1){ //Es gráfica de barras
      if(llamadasBarras == 1){
         verLlamadas();
      }else if(ventasBarras == 1){
         verVentas();
      }else{
         verMontos();
      }
   }else{ //Es gráfica circular
      if(llamadasBarras == 1){
         verLlamadasCircular();
      }else if(ventasBarras == 1){
         verVentasCircular();
      }else{
         verMontosCircular();
      }
   }
}