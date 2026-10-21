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
$viewsCulto = (int) ($dados['viewsCult'] ?? 0);
$viewsSlop = (int) ($dados['viewsSlop'] ?? 0);

$maximo = 3600;
$maxViews = 500;
if ($inteligente < 0 || $slop < 0 || $inteligente > $maximo || $slop > $maximo
    || $viewsCulto < 0 || $viewsSlop < 0 || $viewsCulto > $maxViews || $viewsSlop > $maxViews) {
    http_response_code(400);
    exit(json_encode(['ok' => false]));
}

$id = $_SESSION['participante_id'];
$stmt = $conn->prepare(
    "UPDATE participantes SET tempo_inteligente = ?, tempo_slop = ?, views_inteligente = ?, views_slop = ? WHERE id = ? AND acerto_slop IS NULL"
);
$stmt->bind_param("iiiii", $inteligente, $slop, $viewsCulto, $viewsSlop, $id);
$stmt->execute();

echo json_encode(['ok' => true]);