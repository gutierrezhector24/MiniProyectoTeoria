var numeroLlamadas = document.getElementById("numero-llamadas");
var precio = document.getElementById("precio-producto");
var datos;

function abrirModal() {
   $('#modal').modal('show');
}

function ocultarModal() {
   $('#modal').modal('hide');
}

function simular() {
   ocultarModal();
   let tipo = getTipoGrafica();
   if (comprobarNumeroLlamadas() && comprobarPrecio()) {
      if (esEntero(numeroLlamadas.value)) {
         datos = hacerCalculos(numeroLlamadas.value, precio.value);
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

function hacerCalculos(llamadas, precio) {
   ocultarPrimario();
   mostrarSecundario();

   let llamadasContestadas = aproximarAEntero(getLlamadasContestadas(llamadas));
   let llamadasContestadasQueEscuchan = aproximarAEntero(getLlamadasContestadasEscucharPromocion(llamadasContestadas));
   let contesteMujer = aproximarAEntero(getProbabilidadContesteMujer(llamadasContestadas));
   let ventaMujer = aproximarAEntero(getProbabilidadVentaMujer(contesteMujer));

   let llamadasNoContestadas = llamadas - llamadasContestadas;
   let llamadasContestadasQueNoEscuchan = llamadasContestadas - llamadasContestadasQueEscuchan;
   let contesteHombre = llamadasContestadas - contesteMujer;
   let ventaHombre = aproximarAEntero(getProbabilidadVentaHombre(contesteHombre));

   let montoVentasMujer = getMontoVentasMujeres(ventaMujer, precio);
   let montoVentasHombre = getMontoVentasHombres(ventaHombre, precio);

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

function getLlamadasContestadas(llamadas) {
   return 0.80 * llamadas;
}

function getLlamadasContestadasEscucharPromocion(llamadasContestadas) {
   return 0.55 * llamadasContestadas;
}

function getProbabilidadContesteMujer(llamadas) {
   return 0.65 * llamadas;
}

function getProbabilidadVentaMujer(llamadasContestadasMujer) {
   return 0.16 * llamadasContestadasMujer;
}

function getProbabilidadVentaHombre(llamadasContestadasHombre) {
   return 0.10 * llamadasContestadasHombre;
}

function getMontoVentasMujeres(numeroVentasMujer, precio) {
   return numeroVentasMujer * precio;
}

function getMontoVentasHombres(numeroVentasHombre, precio) {
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
   tipo == 1 ? graficaDeBarras(numeroLlamadas, datos) : graficaCircular(numeroLlamadas, datos);
}

function graficaDeBarras(numeroLlamadas, datos) {
   let ctxLlamadas = document.getElementById('chart-llamadas').getContext('2d');
   let chartLlamadas = new Chart(ctxLlamadas, {
      type: 'bar',
      data: {
         labels: ['Hechas', 'Contestadas', 'NO contestadas', 'Contestadas (escuchan)', 'Contestadas (NO escuchan)'
            , 'Contestadas (hombres)', 'Contestadas (mujeres)'],
         datasets: [{
            label: 'LLAMADAS',
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
            label: 'VENTAS',
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

   verLlamadasCircular();

}

function verVentas() {
   ocultarChartLlamadas();
   ocultarMontos();
   ocultarChartLlamadasCircular();
   mostrarChartVentas();
}

function verLlamadas() {
   ocultarChartVentas();
   ocultarMontos();
   ocultarChartLlamadasCircular();
   mostrarChartLlamadas();
}

function verMontos() {
   ocultarChartLlamadas();
   ocultarChartVentas();
   ocultarChartLlamadasCircular();
   mostrarMontos();
}

function verLlamadasCircular() {
   ocultarChartLlamadas();
   ocultarChartVentas();
   ocultarMontos();
   mostrarChartLlamadasCircular();
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