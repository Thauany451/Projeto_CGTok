<?php
session_start();
require_once __DIR__ . '/../../Includes/conexao.php';

if (!isset($_SESSION['participante_id'])) {
    header('Location: login.php');
    exit;
}

$id = $_SESSION['participante_id'];
$perguntas = require __DIR__ . '/../../Includes/perguntas.php';

if (isset($_POST['enviar'])) {
    $acertoCulto = 0;
    $acertoSlop = 0;

    foreach ($perguntas as $p) {
        $escolha = $_POST['pergunta_' . $p['id']] ?? '';
        if ($escolha === $p['correta']) {
            if ($p['tipo'] === 'inteligente') {
                $acertoCulto++;
            } else {
                $acertoSlop++;
            }
        }
    }

    $stmt = $conn->prepare(
        "UPDATE participantes SET acerto_inteligente = ?, acerto_slop = ? WHERE id = ? AND acerto_slop IS NULL"
    );
    $stmt->bind_param("iii", $acertoCulto, $acertoSlop, $id);
    $stmt->execute();

    header('Location: resultado.php');
    exit;
}
?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../Assets/Questionario/CSS/questionario.css">
    <title>Questionário - CGTok</title>
</head>

<body>
    <form method="post" id="formQuiz">
        <div class="topo">
            <span id="contador">Pergunta 1 de <?= count($perguntas) ?></span>
            <progress id="barra" value="1" max="<?= count($perguntas) ?>"></progress>
        </div>

        <?php foreach ($perguntas as $p): ?>
            <div class="pergunta" role="radiogroup" aria-labelledby="titulo_<?= $p['id'] ?>">
                <h2 id="titulo_<?= $p['id'] ?>"><?= htmlspecialchars($p['texto']) ?></h2>
                <?php foreach ($p['alternativas'] as $letra => $texto): ?>
                    <label class="alternativa">
                        <input type="radio" name="pergunta_<?= $p['id'] ?>" value="<?= $letra ?>" required>
                        <span><?= htmlspecialchars($texto) ?></span>
                    </label>
                <?php endforeach; ?>
            </div>
        <?php endforeach; ?>

        <div class="botoes">
            <button type="button" id="proxima" class="btn-quiz">Próxima</button>
            <button type="submit" name="enviar" id="enviar" class="btn-quiz" hidden>Enviar respostas</button>
        </div>
    </form>
    <script src="../../Assets/Questionario/JS/questionario.js"></script>
</body>

</html>