<?php

include('conector.php');

session_start();

//REQUERIMIENTO 7 - ACTUALIZACION DE UN EVENTO DE LA BASE DE DATOS
if(isset($_SESSION['username'])){
    $con = new ConectorBD('localhost', 'root', '0157');
    $data['fechaInicio'] = "'".$_POST['start_date']."'";
    $data['fechaFin'] = "'".$_POST['end_date']."'";
    $data['horaInicio'] = "'".$_POST['start_hour']."'";
    $data['horaFin'] = "'".$_POST['end_hour']."'";
    if ($con->initConexion('agenda')=='OK'){
        if($con->actualizarRegistro('evento',$data,"idEvento ='".$_POST['id']."'")){
            $response['msg'] = 'OK';
        }else{
            $response['msg']= 'No se pudo actualizar el evento';
        }
    }else{
        $response['msg']= 'No se pudo conectar a la base de datos';
    }
}else{
    $response['msg']= 'No se ha iniciado una sesión';
}

echo json_encode($response);
$con->cerrarConexion();
 ?>
