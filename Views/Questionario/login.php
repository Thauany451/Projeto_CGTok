<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/Assets/Questionario/CSS/login.css">
    <title>Login - CGTEC</title>
</head>

<body>
    <div class="intro">
        <h2>Seja bem-vinde ao</h2>
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
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>
            <label for="idade">Idade:</label>
            <input type="number" id="idade" name="idade" min="4" max="80" required>
            <fieldset>
                <legend>Tempo de uso das redes sociais (horas por dia):</legend>
                <input type="radio" id="redes1" name="tempo_redes" value="1" required>
                <label for="redes1">Menos de 1 hora</label>
                <input type="radio" id="redes2" name="tempo_redes" value="2">
                <label for="redes2">1 - 2 horas</label>
                <input type="radio" id="redes3" name="tempo_redes" value="3">
                <label for="redes3">2 - 3 horas</label>
                <input type="radio" id="redes4" name="tempo_redes" value="4">
                <label for="redes4">3 ou mais horas</label>
            </fieldset>
            <button type="submit">Cadastrar</button>
            <button type="button" id="closeCadastro">Fechar</button>
        </form>
    </dialog>

    <script src="/Assets/Questionario/JS/login.js"></script>
</body>

</html>