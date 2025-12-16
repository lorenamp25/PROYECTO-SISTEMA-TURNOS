<?php
/*
GET	    /api/turnos	        Devuelve todos los turnos.
POST	/api/turnos	        Graba un nuevo turno.
GET	    /api/turnos/{email}	Devuelve los turnos de un email.
GET	    /api/turnos/{id}	Devuelve los turnos por id.
DELETE  /api/turnos/{id}	Elimina el turno
*/

header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Función para enviar una respuesta JSON
function responder($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Función para generar los intervalos de 30 minutos entre 9:00 y 17:00
function generar_intervalos($fecha) {
    $intervalos = [];
    $hora_inicio = strtotime($fecha . ' 09:00:00'); // 9:00 AM
    $hora_fin = strtotime($fecha . ' 17:00:00'); // 5:00 PM

    // Generar intervalos de 30 minutos
    while ($hora_inicio < $hora_fin) {
        $intervalos[] = date('Y-m-d H:i:s', $hora_inicio);
        $hora_inicio = strtotime('+30 minutes', $hora_inicio);
    }
    
    return $intervalos;
}


$conexion = mysqli_connect("localhost", "root", "", "sistematurnos");

if($conexion->connect_error) {
    responder(["mensaje" => "Fallo al conectar con la base de datos. $conexion->connect_error"], 500);
}

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$requestUri = preg_replace('/^.*(\/api\/)/', '$1', $requestUri);
$uri = parse_url($requestUri, PHP_URL_PATH);

if ($uri === '/api/turnos/disponibles' && $method === 'GET') {
    $fecha_inicio = date('Y-m-d');
    $fecha_fin = date('Y-m-d', strtotime('+7 days'));

    $turnos_disponibles = [];

    for ($fecha = $fecha_inicio; strtotime($fecha) <= strtotime($fecha_fin); $fecha = date('Y-m-d', strtotime($fecha . ' +1 day'))) {
        $intervalos = generar_intervalos($fecha);
        
        foreach ($intervalos as $intervalo) {
            $sql = "SELECT id FROM turno WHERE fechahora = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $intervalo);
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows == 0) {
                $turnos_disponibles[] = [
                    "fecha" => date('Y-m-d', strtotime($intervalo)),
                    "hora" => date('H:i', strtotime($intervalo))
                ];
            }
            $stmt->close();
        }
    }

    responder($turnos_disponibles);


} elseif (preg_match('/^\/api\/turnos\/(\d+)$/', $uri, $matches)) {
    $turnoId = $matches[1];

    if ($method === "GET") {
        $sql = "SELECT id, email, telefono, fechahora, motivo, tipomascota, estado FROM turno WHERE id = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("s", $turnoId);
        $stmt->execute();
        $stmt->bind_result($id, $email, $telefono, $fechahora, $motivo, $tipomascota, $estado);
       
        if ($stmt->fetch()) {
            $fecha = date('Y-m-d', strtotime($fechahora));
            $hora = date('H:i', strtotime($fechahora));
        
            $turno = [
                "id" => $id,
                "email" => $email,
                "fecha" => $fecha,
                "hora" => $hora,
                "motivo" => $motivo,
                "tipomascota" => $tipomascota,
                "estado" => $estado
            ];

            responder($turno);
        }
        $stmt->close();

        if (empty($resultado)) {
            responder(["mensaje" => "No se encontraron turnos con id: $turnoId"], 404);
        }

    } elseif ($method === "DELETE") {



    } else {
        responder(["error" => "Metodo no permitido"], 405);
    }

} elseif (preg_match('/^\/api\/turnos\/([\w.@%-]+)$/', $uri, $matches)) {
    $email = $matches[1];

    if ($method === "GET") {
        $sql = "SELECT id, email, telefono, fechahora, motivo, tipomascota, estado FROM turno WHERE email = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($id, $email, $telefono, $fechahora, $motivo, $tipomascota, $estado);

        $resultado = [];
        
        while ($stmt->fetch()) {
            $fecha = date('Y-m-d', strtotime($fechahora));
            $hora = date('H:i', strtotime($fechahora));
        
            $turno = [
                "id" => $id,
                "email" => $email,
                "fecha" => $fecha,
                "hora" => $hora,
                "motivo" => $motivo,
                "tipomascota" => $tipomascota,
                "estado" => $estado
            ];

            $resultado[] = $turno;
        }
        $stmt->close();

        if (empty($resultado)) {
            responder(["mensaje" => "No se encontraron turnos para el email: $email"], 404);
        }

        responder(array_values($resultado)); 
    } else {
        responder(["error" => "Metodo no permitido"], 405);
    }

} elseif ($uri === '/api/turnos') {
    if ($method === 'GET') {
        $sql = "SELECT id, email, telefono, fechahora, motivo, tipomascota, estado FROM turno ORDER BY fechahora ";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $stmt->bind_result($id, $email, $telefono, $fechahora, $motivo, $tipomascota, $estado);

        $resultado = [];
        
        while ($stmt->fetch()) {
            $fecha = date('Y-m-d', strtotime($fechahora));
            $hora = date('H:i', strtotime($fechahora));
        
            $turno = [
                "id" => $id,
                "email" => $email,
                "fecha" => $fecha,
                "hora" => $hora,
                "motivo" => $motivo,
                "tipomascota" => $tipomascota,
                "estado" => $estado
            ];

            $resultado[] = $turno;
        }
        $stmt->close();

        if (empty($resultado)) {
            responder(["mensaje" => "No se encontraron turnos."], 404);
        }

        responder(array_values($resultado)); 

    } elseif ($method === 'POST') {
        // Leer el cuerpo de la solicitud para grabar un turno
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? null;
        $telefono = $input['telefono'] ?? null;
        $fecha = $input['fecha'] ?? null;
        $hora = $input['hora'] ?? null;
        $motivo = $input['motivo'] ?? null;
        $tipomascota = $input['tipomascota'] ?? null;
        $estado = $input['estado'] ?? null;

        if (!$email || !$telefono || !$fecha || !$hora || !$motivo || !$tipomascota || !$estado) {
            responder(["error" => "Faltan parámetros para grabar el turno"], 400);
        }

        $fechahora = $fecha . ' ' . $hora;

        $sql = "INSERT INTO turno (email, telefono, fechahora, motivo, tipomascota, estado) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("sssssi", $email, $telefono, $fechahora, $motivo, $tipomascota, $estado);

        if ($stmt->execute()) {
            $turno_id = $conexion->insert_id;
            responder(["mensaje" => "Turno grabado con éxito", "turnoid" => $turno_id], 201);
        } else {
            responder(["error" => "Error al grabar el turno: $stmt->error"], 400);
        }

    } else {
        responder(["error" => "Metodo no permitido"], 405);
    }

} else {
    // Respuesta para rutas no válidas
    responder(["error" => "Endpoint no válido: $requestUri"], 404);
}

$conn->close();
?>