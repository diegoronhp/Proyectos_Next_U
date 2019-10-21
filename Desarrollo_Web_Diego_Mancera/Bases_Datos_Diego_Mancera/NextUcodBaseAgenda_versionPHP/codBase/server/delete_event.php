<?php

include('conector.php');

session_start();

//REQUERIMIENTO 6 - ELIMINACION DE UN EVENTO DE LA BASE DE DATOS
if(isset($_SESSION['username'])){
    $con = new ConectorBD('localhost', 'root', '0157');
    if ($con->initConexion('agenda')=='OK'){
        if($con->eliminarRegistro('evento',"idEvento = '".$_POST['id']."'")){
            $response['msg'] = 'OK';
        }else{
            $response['msg']= 'No se pudo eliminar el evento';
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
