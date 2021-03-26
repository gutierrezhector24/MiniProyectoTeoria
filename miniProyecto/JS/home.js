var numeroLlamadas = document.getElementById("numero-llamadas");
var precio = document.getElementById("precio-producto");


function simular(){
   if (comprobarNumeroLlamadas() && comprobarPrecio()){
      if (esEntero(numeroLlamadas.value)){
         hacerCalculos(numeroLlamadas.value, precio.value);
      }else{
         alert("El número de llamadas no puede ser un decimal!");
         return false;
      }
   }else{
      alert("Llene todos los campos");
      return false;
   }
}

function comprobarNumeroLlamadas(){
   let valido;
   if (numeroLlamadas.value == "" || numeroLlamadas.value == null){
      valido = false;
   }else{
      valido = true;
   }

   return valido;
}

function comprobarPrecio(){
   let valido;
   if (precio.value == "" || precio.value == null){
      valido = false;
   }else{
      valido = true;
   }

   return valido;
}

function esEntero(numero){
   let entero;
   if (numero % 1 == 0) {
       entero = true;
   } else {
       entero = false;
   }

   return entero;
}

function hacerCalculos(llamadas, precio){
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
   console.log("Total de ventas hechas --> " + montoVentas);
}

function getLlamadasContestadas(llamadas){
   return 0.80*llamadas;
}

function getLlamadasContestadasEscucharPromocion(llamadasContestadas){
   return 0.55*llamadasContestadas;
}

function getProbabilidadContesteMujer(llamadas){
   return 0.65*llamadas;
}

function getProbabilidadVentaMujer(llamadasContestadasMujer){
   return 0.16*llamadasContestadasMujer;
}

function getProbabilidadVentaHombre(llamadasContestadasHombre){
   return 0.10*llamadasContestadasHombre;
}

function getMontoVentasMujeres(numeroVentasMujer, precio){
   return numeroVentasMujer*precio;
}

function getMontoVentasHombres(numeroVentasHombre, precio){
   return numeroVentasHombre*precio;
}

function ocultarPrimario(){
   document.getElementById("principal").style.display = "none";
}

function mostrarSecundario(){
   document.getElementById("secundario").style.display = "block";
}

function recargar(){
   location.reload();
}

function aproximarAEntero(numero){
   return Math.round(numero);
}