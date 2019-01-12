<?php
/**
 * Created by PhpStorm.
 * User: diego
 * Date: 29/12/18
 * Time: 01:49 PM
 */


function clasificarDatos($datos){
    $clasificados = array();
    $clasificados[] = $datos[0];
    for($i=0;$i<sizeof($datos)-1;$i++){
        if(strcmp($datos[$i],$datos[$i+1])!==0){
            $clasificados[] = $datos[$i+1];
        }
    }
    return $clasificados;
}

function obtenerDatos($criterioBusqueda){
    $datos = array();
    $data = file_get_contents("data-1.json");
    $registros = json_decode($data, true);

    foreach ($registros as $registro){
        $datos[] = $registro[$criterioBusqueda];
    }

    sort($datos);
    $datosClasificados = clasificarDatos($datos);
    return $datosClasificados;
}


function imprimirRegistro($direccion,$ciudad,$telefono,$codigoPostal,$tipo,$precio){
    echo "<div class='tituloContenido card'>";
    echo "<div class='itemMostrado'>";
    echo "<img src = 'img/home.jpg' height=85% width=85%>";
    echo "Dirección:  $direccion <br>";
    echo "Ciudad: $ciudad <br>";
    echo "Teléfono: $telefono <br>";
    echo "Còdigo Postal: $codigoPostal <br>";
    echo "Tipo: $tipo <br>";
    echo "Precio: $precio <br>";
    echo "</div>";
    echo "</div>";
}


function obtenerRegistrosCompletos(){
    $data = file_get_contents("data-1.json");
    $registros = json_decode($data, true);

    foreach ($registros as $registro){
        $direccion = $registro["Direccion"];
        $ciudad = $registro["Ciudad"];
        $telefono = $registro["Telefono"];
        $codigoPostal = $registro["Codigo_Postal"];
        $tipo = $registro["Tipo"];
        $precio = $registro["Precio"];

        imprimirRegistro($direccion,$ciudad,$telefono,$codigoPostal,$tipo,$precio);

    }
}


function obtenerRegistrosFiltrados(){
    $data = file_get_contents("data-1.json");
    $registros = json_decode($data, true);

    $selectCiudad = $_POST['ciudad'];
    $selectTipo = $_POST['tipo'];
    $selectPrecio = $_POST['precio'];
    $dividirPrecios = strripos($selectPrecio, ';');
    $minimo = substr($selectPrecio, 0, ($dividirPrecios));
    $maximo = substr($selectPrecio, ($dividirPrecios+1), 5);


    foreach ($registros as $registro){
        $direccion = $registro["Direccion"];
        $ciudad = $registro["Ciudad"];
        $telefono = $registro["Telefono"];
        $codigoPostal = $registro["Codigo_Postal"];
        $tipo = $registro["Tipo"];
        $precioMostrar = $registro["Precio"];
        $precioComparar = str_replace(',','',substr($registro["Precio"],1,12));


        if(($selectCiudad == '') and ($selectTipo == '')){
            if(($precioComparar >= $minimo) and ($precioComparar <= $maximo)){
                imprimirRegistro($direccion,$ciudad,$telefono,$codigoPostal,$tipo,$precioMostrar);
            }
        }


        if(($selectCiudad == $ciudad) and ($selectTipo == $tipo)){
            if(($precioComparar >= $minimo) and ($precioComparar <= $maximo)){
                imprimirRegistro($direccion,$ciudad,$telefono,$codigoPostal,$tipo,$precioMostrar);
            }
        }

        if($selectCiudad == ''){
            if(($selectTipo == $tipo) and ($precioComparar >= $minimo) and ($precioComparar <= $maximo)){
                imprimirRegistro($direccion,$ciudad,$telefono,$codigoPostal,$tipo,$precioMostrar);
            }
        }

        if($selectTipo == ''){
            if(($selectCiudad == $ciudad) and ($precioComparar >= $minimo) and ($precioComparar <= $maximo)){
                imprimirRegistro($direccion,$ciudad,$telefono,$codigoPostal,$tipo,$precioMostrar);
            }
        }

    }
}

?>