/*DECLARACION DE VARIABLES GLOBALES Y CONSTANTES*/
const cantidadColumnas = 7;
const cantidadFilas = 7;
const puntajeMinimo = 10;
var puntaje = 0, movimientos = 0;
var fichasIguales = new Array(cantidadColumnas * cantidadFilas);
var columnasRecorridas = false, filasRecorridas = false, juegoTerminado = false;


/*FUNCIONES PARA LA ANIMACION DEL TITULO*/
function cambiarTituloAmarillo(amarillo) {
    $('.main-titulo').animate({
        color: amarillo
    }, 1000, function () {
        cambiarTituloBlanco('#FFF')
    })
}

function cambiarTituloBlanco(blanco) {
    $('.main-titulo').animate({
        color: blanco
    }, 2000, function () {
        cambiarTituloAmarillo('#DCFF0E')
    })
}


/*FUNCION PARA PODER ARRASTRAR LAS FICHAS DENTRO DEL TABLERO*/
function arrastrarDulces() {
    $('img').draggable({
        containment: '.panel-tablero',
        droppable: 'img',
        revert: true,
        revertDuration: 500,
        grid: [100, 100],
        zIndex: 10,
        drag: constrainCandyMovement
    });
    $('img').droppable({
        drop: intercambiarFichas
    });
    enableEvent();
}

function disableEvent() {
    $('img').draggable('disable');
    $('img').droppable('disable');
}

function enableEvent() {
    $('img').draggable('enable');
    $('img').droppable('enable');
}

function constrainCandyMovement(event, candyDrag) {
    candyDrag.position.top = Math.min(100, candyDrag.position.top);
    candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
    candyDrag.position.left = Math.min(100, candyDrag.position.left);
    candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

function intercambiarFichas(event, candyDrag) {
    var candyDrag = $(candyDrag.draggable);
    var dragSrc = candyDrag.attr('src');
    var candyDrop = $(this);
    var dropSrc = candyDrop.attr('src');
    candyDrag.attr('src', dropSrc);
    candyDrop.attr('src', dragSrc);
    movimientos++;
}


/*FUNCION PARA MODIFICAR LA CANTIDAD DE MOVIMIENTOS DE FICHAS ARRASTRADAS*/
function actualizarMovimientos() {
    $('#movimientos-text').text(movimientos);
}


/*FUNCION PARA TERMINAR EL JUEGO*/
function terminarJuego(){
    $('div.panel-tablero, div.time').effect('fold');
    $('h1.main-titulo').addClass('title-over').text('Gracias por jugar!');
    $('div.score, div.moves, div.panel-score').width('100%');
    juegoTerminado = true;
}


/*FUNCION PARA INICIAR EL JUEGO*/
function iniciarJuego(){
    $('div.panel-tablero, div.time').effect('bounce');
    $('h1.main-titulo').addClass('title-over').text('Match Game');
}


/*FUNCION PARA LLENAR EL TABLERO CON FICHAS*/
function iniciarTableroFichas() {
    var k = 1, contenedor = '', numero = '', ruta = '';

    for (var i = 0; i < cantidadFilas; i++) {
        contenedor = '.col-' + (i + 1);
        for (var j = 0; j < cantidadColumnas; j++, k++) {
            numero = Math.floor((Math.random() * 4) + 1);
            ruta = 'image/' + numero + '.png';
            $(contenedor).append("<div id = " + 'ficha-' + (k) + "><img src = " + ruta + "></div>");
        }
    }
    arrastrarDulces();
}


/*FUNCION PARA ACTULIZAR EL LA PUNTUACION DEL JUEGO*/
function actualizarPuntuacion() {
    $('#score-text').text(puntaje);
}


/*FUNCION PARA REINICIAR EL TABLERO CON NUEVAS FICHAS*/
function reiniciarTableroFichas() {
    var contenedor = '', numero = '', ruta = '';

    for (var i = 0; i < cantidadFilas; i++) {
        contenedor = '.col-' + (i + 1);
        for (var j = 0; j < cantidadColumnas; j++) {
            $(contenedor + ' div').remove();
        }
    }
    puntaje = 0;
    actualizarPuntuacion();
    iniciarJuego();
    iniciarTableroFichas();
}




/*FUNCION PARA ANIMACION DE LAS FICHAS IGUALES*/
function cambiarFichasIguales() {

    disableEvent();
    for (var i = 0; i < fichasIguales.length; i++) {
        if ((fichasIguales[i] != '') || (fichasIguales[i] != undefined)) {
            $("#" + fichasIguales[i] + " img").effect('pulsate', 400).animate({
                opacity: '0'
            }, {
                duration: 400
            }).animate({
                opacity: '100'
            }, {
                duration: 400,
                complete: function () {
                    eliminarFichasIguales()
                },
                queue: true
            })
        }
    }
    enableEvent();
}


/*FUNCION PARA ELIMINAR LAS FICHAS IGUALES*/
function eliminarFichasIguales() {
    var numero = '', ruta = '', rutaNueva = '';

    for (var i = 0; i < fichasIguales.length; i++) {
        ruta = $("#" + fichasIguales[i] + " img").attr('src');
        if ((fichasIguales[i] != '') || (fichasIguales[i] != undefined)) {
            //$("#" + fichasIguales[i] + " img").removeAttr('src');
            numero = Math.floor((Math.random() * 4) + 1);
            rutaNueva = 'image/' + numero + '.png';
            $("#" + fichasIguales[i] + " img").removeAttr('src').attr('src', rutaNueva);
        }
    }
}


/*FUNCION PARA AGREGAR NUEVAS FICHAS*/
function agregarNuevasFichas() {
    var k = 1, numero = '', ruta = '', rutaNueva = '';

    for (var i = 0; i < cantidadColumnas; i++) {
        for (var j = 0; j < cantidadFilas; j++, k++) {
            ruta = $("#ficha-" + k + " img").attr('src');
            console.log('No entro al metodo...' + ruta);
            if ((ruta == '') || (ruta == undefined)) {
                console.log('Entro al metodo...' + ruta);
                numero = Math.floor((Math.random() * 4) + 1);
                rutaNueva = 'image/' + numero + '.png';
                $("#ficha-" + k + " img").attr('src', rutaNueva).show();
            }
        }
    }
}


/*FUNCION PARA BUSCAR COINCIDENCIA DE DOS FICHAS IGUALES*/
function buscarCoincidenciaDosFichas(idFicha_1, idFicha_2) {
    var sonIguales = '', ruta_1 = '', ruta_2 = '';

    if ((idFicha_1 == '') || (idFicha_2 == '')) {
        sonIguales = false;
    }

    else {
        ruta_1 = $("#" + idFicha_1 + " img").attr('src');
        ruta_2 = $("#" + idFicha_2 + " img").attr('src');

        if (ruta_1 == ruta_2) {
            sonIguales = true;
        }
        else {
            sonIguales = false;
        }
    }
    return sonIguales;
}



/*FUNCION PARA EVALUAR EL PUNTAJE DE LAS COINCIDENCIAS*/
function evaluarPuntajeCoincidencias(coincidencias) {

    switch (coincidencias) {
        case 1:
            puntaje += puntajeMinimo;
            break;
        case 2:
            puntaje += (puntajeMinimo * 2);
            break;
        case 3:
            puntaje += (puntajeMinimo * 5);
            break;
        case 4:
            puntaje += (puntajeMinimo * 10);
            break;
        case 5:
            puntaje += (puntajeMinimo * 20);
            break;
    }


}


/*FUNCION PARA BUSCAR COINICIDENCIAS DE TRES O MAS FICHAS*/
function verificarCoincidencias(fichas) {
    var coincidencias = 0, i = 0, j = 0;

    while (i < fichas.length - 1) {

        if ((buscarCoincidenciaDosFichas(fichas[i], fichas[i + 1])) && (buscarCoincidenciaDosFichas(fichas[i + 1], fichas[i + 2]))) {
            j = i;
            fichasIguales.push(fichas[j]);
            fichasIguales.push(fichas[j + 1]);
            fichasIguales.push(fichas[j + 2]);
            j += 2;
            coincidencias++;

            while ((buscarCoincidenciaDosFichas(fichas[j], fichas[j + 1])) && (j < fichas.length - 1)) {
                fichasIguales.push(fichas[j + 1]);
                coincidencias++;
                j++;
            }

            if (!buscarCoincidenciaDosFichas(fichas[j], fichas[j + 1])) {
                i = j;
            }
        }
        i++;
    }
    evaluarPuntajeCoincidencias(coincidencias);
}

/*FUNCION PARA RECORRER LAS COLUMNAS DE LA MATRIZ DEL TABLERO*/
function recorrerColumnas(event) {
    var k = 1, ficha = '';

    for (var i = 0; i < cantidadColumnas; i++) {
        var columna = new Array(cantidadFilas);
        for (var j = 0; j < cantidadFilas; j++, k++) {
            ficha = 'ficha-' + k;
            columna[j] = ficha;
        }
        verificarCoincidencias(columna);
    }
    columnasRecorridas = true;
}


/*FUNCION PARA RECORRER LAS FILAS DE LA MATRIZ DEL TABLERO*/
function recorrerFilas(event) {
    var ficha = '';

    for (var i = 0; i < cantidadFilas; i++) {
        var fila = new Array(cantidadColumnas);
        for (var j = 0, m = 0; j < cantidadColumnas * cantidadColumnas; j += cantidadColumnas, m++) {
            ficha = 'ficha-' + ((j + 1) + i);
            fila[m] = ficha;
        }
        verificarCoincidencias(fila);
    }
    filasRecorridas = true;
}


/*FUNCION QUE PERMITE INICIAR LOS RECORRIDOS EN EL TABLERO*/
function iniciarRecorridos() {
    recorrerColumnas();
    recorrerFilas();
}


/*FUNCION PARA COMPROBAR SI HAN SIDO COMPLETADOS LOS RECORRIDOS DEL TABLERO*/
function comprobarRecorridos() {

    if ((columnasRecorridas) && (filasRecorridas)) {
        cambiarFichasIguales();
        actualizarPuntuacion();
        actualizarMovimientos();
    }
    else {
        columnasRecorridas = false;
        filasRecorridas = false;
        fichasIguales = new Array(cantidadColumnas * cantidadFilas);
    }

}

/*FUNCION DEL TEMPORIZADOR PARA LA DURACION DEL JUEGO*/
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $(display).text(minutes + ":" + seconds);
        iniciarRecorridos();
        comprobarRecorridos();

        if (--timer < 0) {
            $("body").trigger("finTiempo");
            clearInterval(interval);
            terminarJuego();
        }
    }, 1000);
}


$(function () {
    /*INICIO DE LA ANIMACION DEL TITULO*/
    cambiarTituloBlanco('#FFF');


    /*INICIO DEL JUEGO*/
    $('.btn-reinicio').click(function(){
        var funcion = '', tiempo = '';

        funcion = $(this).text();
        tiempo = 60 * 2;

        if (funcion == 'Iniciar'){
            $(this).text('Reiniciar');
            iniciarTableroFichas();
        }

        else if (funcion == 'Reiniciar'){
            $(this).text('Iniciar');

            if(!juegoTerminado){
                terminarJuego();
                reiniciarTableroFichas();
            }
            else{
                reiniciarTableroFichas();
                juegoTerminado = false;
            }

        }

        startTimer(tiempo, $("#timer"));

    });

});