<?php
session_start();
require_once __DIR__ . '/../../Includes/conexao.php';

if (!isset($_SESSION['participante_id'])) {
    header('Location: /Views/Questionario/login.php');
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

    header('Location: /Views/Questionario/resultado.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/Assets/Questionario/CSS/questionario.css">
    <title>Questionário - CGTok</title>
</head>
<body>
    <form method="post">
        <?php foreach ($perguntas as $p): ?>
            <fieldset>
                <legend><?= htmlspecialchars($p['texto']) ?></legend>
                <?php foreach ($p['alternativas'] as $letra => $texto): ?>
                    <label>
                        <input type="radio" name="pergunta_<?= $p['id'] ?>" value="<?= $letra ?>" required>
                        <?= $letra ?>) <?= htmlspecialchars($texto) ?>
                    </label>
                <?php endforeach; ?>
            </fieldset>
        <?php endforeach; ?>
        <button type="submit" name="enviar">Enviar respostas</button>
    </form>
</body>
</html>