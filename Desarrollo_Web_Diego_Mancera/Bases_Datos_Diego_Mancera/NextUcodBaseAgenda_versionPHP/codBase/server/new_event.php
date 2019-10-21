<?php

include('conector.php');

session_start();

//REQUERIMIENTO 5 - CREACION DE UN NUEVO EVENTO ASOCIADO AL USUARIO LOGUEADO
$evento['tituloEvento'] = "'".$_POST['titulo']."'";
$evento['fechaInicio'] = "'".$_POST['start_date']."'";
$evento['horaInicio'] = "'".$_POST['start_hour']."'";
$evento['fechaFin'] = "'".$_POST['end_date']."'";
$evento['horaFin'] = "'".$_POST['end_hour']."'";
$evento['diaCompleto'] = "'".$_POST['diaCompleto']."'";


$conexion = new ConectorBD('localhost','root','0157');
$response['conexion'] = $conexion->initConexion('agenda');

if(isset($_SESSION['username'])){
    if($response['conexion'] == 'OK'){
        $consulta = $conexion->consultar(['usuario'],['idUsuario'],"WHERE usuarioCorreo = '".$_SESSION['username']."'");
        $registro = $consulta->fetch_assoc();
        $evento['fkUsuario'] = $registro['idUsuario'];

        if($conexion->insertData('evento',$evento)){
            $response['msg'] = "OK";
        }else{
            $response['msg'] = "Error. No fue posible registrar el evento";
        }
    }else{
        $response['msg'] = "error en la comunicación con el servidor - modelo";
    }

    echo json_encode($response);
    $conexion->cerrarConexion();
}





 ?>
