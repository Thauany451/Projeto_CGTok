<?php
session_start();
require_once __DIR__ . '/../../Includes/conexao.php';

if (isset($_POST['cadastrar'])) {
    $nomeCD = trim($_POST['nomeCD'] ?? '');
    $idade = (int) ($_POST['idade'] ?? 0);
    $tempo_redes = (int) ($_POST['tempo_redes'] ?? 0);

    if ($nomeCD === '' || mb_strlen($nomeCD) > 80 || $idade < 4 || $idade > 80 || $tempo_redes < 1 || $tempo_redes > 4) {
        exit("Dados inválidos.");
    }

    $stmt = $conn->prepare("INSERT INTO participantes (nome, idade, tempo_redes) VALUES (?, ?, ?)");
    $stmt->bind_param("sii", $nomeCD, $idade, $tempo_redes);
    $stmt->execute();
    
    $_SESSION['participante_id'] = $stmt->insert_id;
    header("Location: /Views/Video/index.php");
    exit;

    } elseif (isset($_POST['entrar'])) {
        $nomeLG = trim($_POST['nomeLG'] ?? '');
        $senha = ($_POST['senha'] ?? '');
        
        $stmt = $conn->prepare("SELECT id, senha_hash FROM membros WHERE nome = ?");
        $stmt->bind_param("s", $nomeLG);
        $stmt->execute();
        $linha = $stmt->get_result()->fetch_assoc();

           if ($linha && password_verify($senha, $linha['senha_hash'])) {
            session_regenerate_id(true);
            $_SESSION['membro_id'] = $linha['id'];
            exit("Logado!");
        } else {
            exit("Nome ou senha incorretos.");
        }
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../Assets/Questionario/CSS/login.css">
    <title>Login - CGTEC</title>
</head>

<body>
    <div class="intro">
        <h2>Seja bem-vindo ao</h2>
        <h1>CGTok</h1>
        <p>A seguir, iniciaremos um breve <br>questionário sobre os vídeos assistidos.<br>Para garantir um controle mais eficiente,<br> realize seu cadastro ou login.</p>
    </div>
    <div class="CadLog">
        <button id="cadastroBtn" class="btn">Cadastro</button>
        <button id="loginBtn" class="btn">Login</button>
    </div>

    <dialog id="DialogCadastro">
        <form id="formCad" method="post">
            <h2>Cadastre-se</h2>
            <div class="linha">
                <div class="campo">
                    <label for="nomeCD">Nome:</label>
                    <input type="text" id="nomeCD" name="nomeCD" required>
                </div>
                <div class="campo">
                    <label for="idade">Idade:</label>
                    <input type="number" id="idade" name="idade" min="4" max="80" required>
                </div>
            </div>
            <fieldset>
                <legend>Tempo assistindo vídeos (horas por dia):</legend>
                <div class="opcao">
                    <input type="radio" id="redes1" name="tempo_redes" value="1" required>
                    <label for="redes1">Menos de 1 hora</label>
                </div>
                <div class="opcao">
                    <input type="radio" id="redes2" name="tempo_redes" value="2">
                    <label for="redes2">1 - 2 horas</label>
                </div>
                <div class="opcao">
                    <input type="radio" id="redes3" name="tempo_redes" value="3">
                    <label for="redes3">2 - 3 horas</label>
                </div>
                <div class="opcao">
                    <input type="radio" id="redes4" name="tempo_redes" value="4">
                    <label for="redes4">3 ou mais horas</label>
                </div>
            </fieldset>
            <button type="submit" id="cadastrarBtn" name="cadastrar">Cadastrar</button>
            <button type="button" id="fecharCadastro">X</button>
        </form>
    </dialog>
    <dialog id="DialogLogin">
        <form id="formLog" method="post">
            <h2>Login</h2>
            <label for="nomeLG">Nome:</label>
            <input type="text" id="nomeLG" name="nomeLG" required>
            <label for="senha">Senha:</label>
            <input type="password" id="senha" name="senha" max="3" required>
            <button type="submit" id="EntrarBtn" name="entrar">Entrar</button>
            <button type="button" id="fecharLogin">X</button>
        </form>
    </dialog>

    <script src="../../Assets/Questionario/JS/login.js"></script>
</body>

</html><!-- Comentário -->