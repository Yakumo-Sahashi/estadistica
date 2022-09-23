window.onload = () => {
    var carga = document.getElementById('contenedor');
    $('[name=datos]').val("");
    carga.style.visibility = 'hidden';
    carga.style.opacity = '0';
}

$(document).ready(() => {
	let altura= $('.menu').offset().top;
	$(window).on('scroll',() => {
		if ($(window).scrollTop() > altura) {
			$('.menu').addClass('menu-fixed');
		}else{
			$('.menu').removeClass('menu-fixed');
		}
	});
});

let arreglo = new Array();
let moda = {};

const generar_tabla = (contenido) => {
    $(`#tabla_contenido`).html(``);
    $('#table_created_rooms').DataTable().destroy();
    let tabla = ``;
    let num = 1;
    contenido.map(dato => {
        tabla += `
        <tr> 
            <td>${num <= 9 ? ('0' + num) : num}</td>
            <td>${dato}</td>
        </tr>`;
        num++;
    });
    $(`#tabla_contenido`).html(`${tabla}`);
    $('#table_created_rooms').DataTable({
        "language": {
            "url": "./app/json/lenguaje.json"
        }
    });
}

const extraer_datos = () => {
    let texto = $('[name=datos]').val();
    let datos = texto.split(/\n/);
    arreglo = (datos[datos.length-1] == "") ? datos.splice(0, datos.length-1) : datos;
    console.log(arreglo)
    generar_tabla(arreglo);
}

const calcular_media = () => {
    let media = 0;
    arreglo.map(dato => media = media + parseInt(dato.trim()));
    return media / parseInt(arreglo.length);
}

const calcular_mediana = () => {
    arreglo.sort((a, b) => b - a);
    return arreglo[Math.round((arreglo.length / 2))];
}

const calcular_moda = () => {
    arreglo.map(dato => {
        if (moda[dato]) {
            moda[dato] += 1;
        } else {
            moda[dato] = 1;
        }
    });
    let calculo = Object.entries(moda).sort((elementoA, elementoB) =>  elementoA[1] - elementoB[1]);
    let resultado = calculo[calculo.length - 1].toString();
    resultado = resultado.split(",");
    return resultado[0];
}

const calcular = () => {
    if(arreglo != "") {
        $(`[name=media]`).val(calcular_media());
        $(`[name=mediana]`).val(calcular_mediana());
        $(`[name=moda]`).val(calcular_moda);
    }else {
        swal({
            title: `Error!`,
            text: `Primero debes ingresar datos para evaluar!\nPor favor intentalo una vez mas.`,
            icon: `warning`,
            button: `Aceptar`,
        });
    }
}

const limpiar = () => {
    arreglo = new Array();
    $(`[name=media]`).val(``);
    $(`[name=mediana]`).val(``);
    $(`[name=moda]`).val(``);   
    $(`[name=datos]`).val(``); 
    $('#table_created_rooms').DataTable().destroy();
    $(`#tabla_contenido`).html(``);
    swal({
        title: `Correcto!`,
        text: `Los campos se han limpiado de manera correcta!`,
        icon: `success`,
        button: `Aceptar`,
    });
}

$(document).on('input', '[name=datos]', () => {
    $(`[name=datos`).val($(`[name=datos]`).val().replace(/[^0-9\n]/g, ''));
});

$(document).on('keyup', '[name=datos]', () => {
    extraer_datos();
    $(`[name=media]`).val(``);
    $(`[name=mediana]`).val(``);
    $(`[name=moda]`).val(``);
});