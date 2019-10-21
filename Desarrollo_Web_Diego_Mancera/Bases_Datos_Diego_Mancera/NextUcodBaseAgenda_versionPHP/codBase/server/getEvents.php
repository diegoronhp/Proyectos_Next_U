<?php

include('conector.php');

session_start();

//REQUERIMIENTO 4 - DESPLIEGUE EN LA VISTA DE LOS REGISTROS DE EVENTOS ASOCIADOS AL USUARIO QUE INICIA SESION

if(isset($_SESSION['username'])){
    $con = new ConectorBD('localhost', 'root', '0157');

    if($con->initConexion('agenda') == 'OK'){
        $resultado = $con->consultar(['usuario'], ['idUsuario'], "WHERE usuarioCorreo ='".$_SESSION['username']."'");
        $fila = $resultado->fetch_assoc();
        $resultado = $con->getEventsUser($fila['idUsuario']);
        $i = 0;
        while($fila = $resultado->fetch_assoc()){
            $response['eventos'][$i]['id'] = $fila['Id'];
            $response['eventos'][$i]['title'] = $fila['Titulo'];
            $response['eventos'][$i]['start'] = $fila['FechaInicial'];
            $response['eventos'][$i]['hora_i'] = $fila['HoraInicial'];
            $response['eventos'][$i]['end'] = $fila['FechaFinal'];
            $response['eventos'][$i]['hora_f'] = $fila['HoraFinal'];
            $response['eventos'][$i]['allDay'] = $fila['DiaCompleto'];
            $i++;
        }
        $response['msg'] = 'OK';
    }else{
        $response['msg'] = "No se pudo conectar a la Base de Datos";
    }

}else{
    $response['msg'] = "No se ha iniciado una sesión";
}

echo json_encode($response);
$con->cerrarConexion();
 ?>
