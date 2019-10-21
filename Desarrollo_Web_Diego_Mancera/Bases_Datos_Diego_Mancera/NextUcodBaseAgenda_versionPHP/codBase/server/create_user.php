<?php

include('conector.php');

//REQUERMIENTO 2 - CREACION DE TRES USUARIOS EN LA BASE DE DATOS
//DATOS USUARIO 1
$usuario_1['nombreUsuario'] = "'".'Diego Mancera'."'";
$usuario_1['fechaNacimiento'] = "'".'1980-06-22'."'";
$usuario_1['usuarioCorreo'] = "'".'dmanceras@ucentral.edu.co'."'";
$usuario_1['contrasena'] = "'".password_hash('220680', PASSWORD_DEFAULT)."'";

//DATOS USUARIO 2
$usuario_2['nombreUsuario'] = "'".'Juan Arjona'."'";
$usuario_2['fechaNacimiento'] = "'".'1983-08-06'."'";
$usuario_2['usuarioCorreo'] = "'".'juanete@gmail.com'."'";
$usuario_2['contrasena'] = "'".password_hash('060883', PASSWORD_DEFAULT)."'";

//DATOS USUARIO 3
$usuario_3['nombreUsuario'] = "'".'Jose Arjona'."'";
$usuario_3['fechaNacimiento'] = "'".'1985-02-28'."'";
$usuario_3['usuarioCorreo'] = "'".'joselito@gmail.com'."'";
$usuario_3['contrasena'] = "'".password_hash('280285', PASSWORD_DEFAULT)."'";

$conexion = new ConectorBD('localhost','root','0157');
$response = $conexion->initConexion('agenda');

crearUsuario($usuario_1,$conexion,$response);
crearUsuario($usuario_2,$conexion,$response);
crearUsuario($usuario_3,$conexion,$response);

function crearUsuario($usuario,$conexion,$response){
    if($response == 'OK'){
        if($conexion->insertData('usuario',$usuario)){
            echo 'Usuario registrado';
        }else{
            echo 'Error en el registro de usuario. Por favor rectifique la informacion registrada e intentelo de nuevo';
    }
    }else{
        echo 'No fue posible establecer conexion con la base de datos';
    }
}

$conexion->cerrarConexion();
?>
