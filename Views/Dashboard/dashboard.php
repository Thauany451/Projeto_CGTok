<?php
session_start();
require_once __DIR__ . '/../../Includes/conexao.php';

if (!isset($_SESSION['membro_id'])) {
    header('Location: ../Questionario/login.php');
    exit;
}

function formatarTempo($s)
{
    if ($s === null) {
        return '—';
    }
    $s = (int) round($s);
    return floor($s / 60) . 'min ' . ($s % 60) . 's';
}

function pct($acertos, $total)
{
    return ($acertos !== null && $total > 0) ? round($acertos / $total * 100) . '%' : '—';
}

function fracao($acertos, $total)
{
    return $acertos === null ? '—' : $acertos . '/' . $total;
}

$faixas = [1 => 'Menos de 1 hora', 2 => '1 - 2 horas', 3 => '2 - 3 horas', 4 => '3 ou mais horas'];

// Quantas perguntas existem de cada tipo
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

// Quantas pessoas se cadastraram
$cadastrados = (int) $conn->query("SELECT COUNT(*) FROM participantes")->fetch_row()[0];

// Médias de quem terminou o questionário
$media = $conn->query(
    "SELECT COUNT(*) AS completos,
            AVG(acerto_inteligente) AS ac_culto, AVG(acerto_slop) AS ac_slop,
            AVG(tempo_inteligente) AS t_culto, AVG(tempo_slop) AS t_slop
     FROM participantes WHERE acerto_slop IS NOT NULL"
)->fetch_assoc();

// Tempo médio por vídeo
$video = $conn->query(
    "SELECT COUNT(*) AS n,
            SUM(tempo_inteligente) / NULLIF(SUM(views_inteligente), 0) AS por_culto,
            SUM(tempo_slop) / NULLIF(SUM(views_slop), 0) AS por_slop
     FROM participantes
     WHERE acerto_slop IS NOT NULL AND views_inteligente IS NOT NULL AND views_slop IS NOT NULL"
)->fetch_assoc();

// Lista dos participantes
$lista = $conn->query(
    "SELECT id, nome, idade, tempo_redes, tempo_inteligente, tempo_slop, acerto_inteligente, acerto_slop
     FROM participantes ORDER BY id DESC LIMIT 200"
);
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../Assets/Questionario/CSS/resultado.css">
    <link rel="stylesheet" href="../../Assets/Dashboard/dashboard.css">
    <title>Dashboard - CGTok</title>
</head>

<body>
    <main>
        <div class="topo">
            <h1>Dashboard</h1>
            <a href="../../Includes/sair.php"><button class="sairDash">Sair</button></a>
        </div>

        <div class="grade">
            <section class="card">
                <h2>Participantes</h2>
                <p class="destaque"><?= $cadastrados ?></p>
                <p>cadastrados, <?= (int) $media['completos'] ?> terminaram o questionário</p>
            </section>

            <section class="card">
                <h2>Acertos médios</h2>
                <p>Perguntas sobre conteúdo culto: <strong><?= pct($media['ac_culto'], $totalCulto) ?></strong></p>
                <p>Perguntas sobre conteúdo slop: <strong><?= pct($media['ac_slop'], $totalSlop) ?></strong></p>
            </section>

            <section class="card">
                <h2>Tempo médio por pessoa</h2>
                <p>Conteúdo culto: <strong><?= formatarTempo($media['t_culto']) ?></strong></p>
                <p>Conteúdo slop: <strong><?= formatarTempo($media['t_slop']) ?></strong></p>
            </section>

            <section class="card">
                <h2>Tempo médio por vídeo</h2>
                <p>Conteúdo culto: <strong><?= formatarTempo($video['por_culto']) ?></strong></p>
                <p>Conteúdo slop: <strong><?= formatarTempo($video['por_slop']) ?></strong></p>
                <p class="nota">Baseado em <?= (int) $video['n'] ?> participantes</p>
            </section>

            <!-- Quero colocar gráficos aqui -->
        </div>

            <section class="card tabela">
                <h2>Lista de participantes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Tempo nas redes</th>
                            <th>Tempo culto</th>
                            <th>Tempo slop</th>
                            <th>Acertos culto</th>
                            <th>Acertos slop</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($l = $lista->fetch_assoc()): ?>
                            <tr>
                                <td><?= $l['id'] ?></td>
                                <td><?= htmlspecialchars($l['nome']) ?></td>
                                <td><?= $l['idade'] ?></td>
                                <td><?= $faixas[$l['tempo_redes']] ?? '—' ?></td>
                                <td><?= formatarTempo($l['tempo_inteligente']) ?></td>
                                <td><?= formatarTempo($l['tempo_slop']) ?></td>
                                <td><?= fracao($l['acerto_inteligente'], $totalCulto) ?></td>
                                <td><?= fracao($l['acerto_slop'], $totalSlop) ?></td>
                            </tr>
                        <?php endwhile; ?>
                    </tbody>
                </table>
            </section>
    </main>
</body>

</html>