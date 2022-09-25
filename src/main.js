window.onload = () => {
    let carga = document.getElementById('contenedor');
    $('[name=datos]').val("");
    carga.style.visibility = 'hidden';
    carga.style.opacity = '0';
}

$(document).ready(() => {
    let altura = $('.menu').offset().top;
    $(window).on('scroll', () => {
        if ($(window).scrollTop() > altura) {
            $('.menu').addClass('menu-fixed');
        } else {
            $('.menu').removeClass('menu-fixed');
        }
    });
});

let arreglo = new Array();
let xili = 0;
let xil = 0;
let moda = {};

const valor_absoluto = (valor_observado, media) => {
    return Math.abs(valor_observado - media);
}

const valor_absoluto_org = (valor_observado, media) => {
    return valor_observado - media;
}

const valor_absoluto_cuadrado = (valor_observado, media) => {
    return Math.pow(Math.abs(valor_observado - media), 2);
}

const distribucion_muestral = () => {
    return (xili / arreglo.length);
}

const calcular_rango = () => {
    return arreglo[0] - arreglo[arreglo.length - 1];
}

const calcular_varianza = () => {
    return xil / (arreglo.length - 1);
}

const desviasion_estandar = () => {
    return Math.sqrt(calcular_varianza());
}

const generar_tabla = (contenido) => {
    xili = 0;
    xil = 0;
    $(`#tabla_contenido`).html(``);
    $('#table_created_rooms').DataTable().destroy();
    let tabla = ``;
    let num = 1;
    contenido.map(dato => {
        xili += valor_absoluto(dato, calcular_media());
        xil += valor_absoluto_cuadrado(dato, calcular_media());
        tabla += `
        <tr> 
            <td>${num <= 9 ? ('0' + num) : num}</td>
            <td>${dato}</td>
            <td>${valor_absoluto(dato, calcular_media())}</td>
            <td>${valor_absoluto_org(dato, calcular_media())}</td>
            <td>${valor_absoluto_cuadrado(dato, calcular_media())}</td>
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
    arreglo = (datos[datos.length - 1] == "") ? datos.splice(0, datos.length - 1) : datos;
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
    let calculo = Object.entries(moda).sort((elementoA, elementoB) => elementoA[1] - elementoB[1]);
    let resultado = calculo[calculo.length - 1].toString();
    resultado = resultado.split(",");
    return resultado[0];
}

const calcular = () => {
    if (arreglo != "") {
        $(`[name=media]`).val(calcular_media());
        $(`[name=mediana]`).val(calcular_mediana());
        $(`[name=moda]`).val(calcular_moda());
        $(`[name=dm]`).val(distribucion_muestral());
        $(`[name=rango]`).val(calcular_rango());
        $(`[name=varianza]`).val(calcular_varianza());
        $(`[name=de]`).val(desviasion_estandar());
    } else {
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
    $(`[name=dm]`).val(``);
    $(`[name=rango]`).val(``);
    $(`[name=varianza]`).val(``);
    $(`[name=de]`).val(``);
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