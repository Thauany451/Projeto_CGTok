<?php
session_start();
require_once __DIR__ . '/conexao.php';

header('Content-Type: application/json');

if (!isset($_SESSION['participante_id'])) {
    http_response_code(401);
    exit(json_encode(['ok' => false]));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['ok' => false]));
}

$dados = json_decode(file_get_contents('php://input'), true) ?? [];

$inteligente = (int) round((float) ($dados['tempoCult'] ?? 0));
$slop = (int) round((float) ($dados['tempoSlop'] ?? 0));

$maximo = 3600; // troque pelo tempo máximo da sessão de vídeos, em segundos
if ($inteligente < 0 || $slop < 0 || $inteligente > $maximo || $slop > $maximo) {
    http_response_code(400);
    exit(json_encode(['ok' => false]));
}

$id = $_SESSION['participante_id'];
$stmt = $conn->prepare(
    "UPDATE participantes SET tempo_inteligente = ?, tempo_slop = ? WHERE id = ? AND acerto_slop IS NULL"
);

$stmt->bind_param("iii", $inteligente, $slop, $id);
$stmt->execute();

echo json_encode(['ok' => true]);