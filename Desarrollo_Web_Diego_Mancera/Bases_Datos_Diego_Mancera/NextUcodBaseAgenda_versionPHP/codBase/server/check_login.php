<?php

require('conector.php');
//REQUERIMIENTO 3 - VALIDACION DE CREDENCIALES DEL USUARIO PARA SU INICIO DE SESION

$conexion = new ConectorBD('localhost','root','0157');
$response['conexion'] = $conexion->initConexion('agenda');

if($response['conexion'] == 'OK'){
    $consulta = $conexion->consultar(['usuario'],['usuarioCorreo','contrasena'],'WHERE usuarioCorreo ="'.$_POST['username'].'"');

    if($consulta->num_rows != 0){
        $fila = $consulta->fetch_assoc();

        if(password_verify($_POST['password'],$fila['contrasena'])){
            $response['acceso'] = 'permitido';
            session_start();
            $_SESSION['username'] = $fila['usuarioCorreo'];
        }else{
            $response['motivo'] = 'Contraseña incorrecta';
            $response['acceso'] = 'restringido';
        }
    }else{
        $response['motivo'] = 'Email no encontrado';
        $response['acceso'] = 'restringido';
    }

    echo json_encode($response);
    $conexion->cerrarConexion();

}



 ?>
