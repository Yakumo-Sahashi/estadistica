"use strict";

window.onload = function () {
  var carga = document.getElementById('contenedor');
  carga.style.visibility = 'hidden';
  carga.style.opacity = '0';
};

var arreglo = new Array();
var moda = {};

var generar_tabla = function generar_tabla(contenido) {
  $("#tabla_contenido").html("");
  $('#table_created_rooms').DataTable().destroy();
  var tabla = "";
  var num = 1;
  contenido.map(function (dato) {
    tabla += "\n        <tr> \n            <td>".concat(num, "</td>\n            <td>").concat(dato, "</td>\n        </tr>");
    num++;
  });
  $("#tabla_contenido").html("".concat(tabla));
  $('#table_created_rooms').DataTable({
    "language": {
      "url": "./app/json/lenguaje.json"
    }
  });
};

var extraer_datos = function extraer_datos() {
  var texto = $('[name=datos]').val();
  var datos = texto.split(/\n/);
  arreglo = datos;
  generar_tabla(datos);
};

var calcular_media = function calcular_media() {
  var media = 0;
  arreglo.map(function (dato) {
    return media = media + parseInt(dato.trim());
  });
  return media / parseInt(arreglo.length);
};

var calcular_mediana = function calcular_mediana() {
  arreglo.sort(function (a, b) {
    return b - a;
  });
  return arreglo[Math.round(arreglo.length / 2)];
};

var calcular_moda = function calcular_moda() {
  arreglo.map(function (dato) {
    if (moda[dato]) {
      moda[dato] += 1;
    } else {
      moda[dato] = 1;
    }
  });
  console.log(moda);
  var calculo = Object.entries(moda).sort(function (elementoA, elementoB) {
    return elementoA[1] - elementoB[1];
  });
  console.log(calculo);
  var resultado = calculo[calculo.length - 1].toString();
  resultado = resultado.split(",");
  return resultado[0];
};

var calcular = function calcular() {
  if (arreglo != "") {
    $("[name=media]").val(calcular_media());
    $("[name=mediana]").val(calcular_mediana());
    $("[name=moda]").val(calcular_moda);
  } else {
    swal({
      title: "Error!",
      text: "Primero debes ingresar datos para evaluar!\nPor favor intentalo una vez mas.",
      icon: "warning",
      button: "Aceptar"
    });
  }
};

$(document).on('keyup', '[name=datos]', function () {
  extraer_datos();
  $("[name=media]").val("");
  $("[name=mediana]").val("");
  $("[name=moda]").val("");
});

var limpiar = function limpiar() {
  arreglo = new Array();
  $("[name=media]").val("");
  $("[name=mediana]").val("");
  $("[name=moda]").val("");
  $("[name=datos]").val("");
  $('#table_created_rooms').DataTable().destroy();
  $("#tabla_contenido").html("");
  swal({
    title: "Correcto!",
    text: "Los campos se han limpiado de manera correcta!",
    icon: "success",
    button: "Aceptar"
  });
};