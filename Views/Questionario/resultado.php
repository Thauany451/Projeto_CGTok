<?php
session_start();
require_once __DIR__ . '/../../Includes/conexao.php';

if (!isset($_SESSION['participante_id'])) {
    header('Location: /Views/Questionario/login.php');
    exit;
}

$id = $_SESSION['participante_id'];
$stmt = $conn->prepare(
    "SELECT nome, tempo_inteligente, tempo_slop, acerto_inteligente, acerto_slop FROM participantes WHERE id = ?"
);
$stmt->bind_param("i", $id);
$stmt->execute();
$r = $stmt->get_result()->fetch_assoc();

if (!$r || $r['acerto_slop'] === null) {
    header('Location: /Views/Questionario/questionario.php');
    exit;
}

$perguntas = require __DIR__ . '/../../Includes/perguntas.php';
$totalCulto = 0;
$totalSlop = 0;
foreach ($perguntas as $p) {
    if ($p['tipo'] === 'inteligente') {
        $totalCulto++;
    } else {
        $totalSlop++;
    }
}

$tempoCulto = (int) $r['tempo_inteligente'];
$tempoSlop = (int) $r['tempo_slop'];
$tempoTotal = $tempoCulto + $tempoSlop;
$pctSlop = $tempoTotal > 0 ? round($tempoSlop / $tempoTotal * 100) : 0;
$pctCulto = $tempoTotal > 0 ? 100 - $pctSlop : 0;

$acertoCulto = (int) $r['acerto_inteligente'];
$acertoSlop = (int) $r['acerto_slop'];
$acertoTotal = $acertoCulto + $acertoSlop;
$totalPerguntas = $totalCulto + $totalSlop;

function formatarTempo($s) {
    return floor($s / 60) . 'min ' . ($s % 60) . 's';
}
?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/Assets/Questionario/CSS/resultado.css">
    <title>Resultado - CGTok</title>
</head>
<body>
    <main>
        <h1>Seu resultado, <?= htmlspecialchars($r['nome']) ?></h1>

        <div class="grade">
            <section class="card">
                <h2>Tempo assistindo</h2>
                <p class="destaque"><?= formatarTempo($tempoTotal) ?></p>
                <p>Conteúdo culto: <?= formatarTempo($tempoCulto) ?> (<?= $pctCulto ?>%)</p>
                <progress class="culto" value="<?= $pctCulto ?>" max="100"></progress>
                <p>Conteúdo slop: <?= formatarTempo($tempoSlop) ?> (<?= $pctSlop ?>%)</p>
                <progress class="slop" value="<?= $pctSlop ?>" max="100"></progress>
            </section>

            <section class="card">
                <h2>Seus acertos</h2>
                <p class="destaque"><?= $acertoTotal ?> de <?= $totalPerguntas ?></p>
                <p>Perguntas sobre conteúdo culto: <?= $acertoCulto ?> de <?= $totalCulto ?></p>
                <p>Perguntas sobre conteúdo slop: <?= $acertoSlop ?> de <?= $totalSlop ?></p>
            </section>
        </div>
    </main>
</body>
</html>