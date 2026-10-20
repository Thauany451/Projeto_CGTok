<?php
session_start();
require_once __DIR__ . '/conexao.php';

if (!isset($_SESSION['participante_id'])) {
    http_response_code(401);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$inteligente = (int) ($_POST['inteligente'] ?? 0);
$slop = (int) ($_POST['slop'] ?? 0);

$maximo = 3600;
if ($inteligente < 0 || $slop < 0 ||
    $inteligente > $maximo || $slop > $maximo) {
    http_response_code(400);
    exit;
}

   $stmt = $conn->prepare("UPDATE participantes SET inteligente = ?, bobo = ?, slop = ? WHERE id = ? AND tempo_slop IS NULL");
   $stmt->bind_param("iii i", $inteligente, $slop, $_SESSION['participante_id']);
   $stmt->execute();