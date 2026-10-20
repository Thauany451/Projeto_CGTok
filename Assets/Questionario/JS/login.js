const btnAbrirCad = document.getElementById("cadastroBtn");
const DialogCad = document.getElementById("DialogCadastro");
const btnFecharCad = document.getElementById("fecharCadastro");

const btnAbrirLogin = document.getElementById("loginBtn");
const DialogLogin = document.getElementById("DialogLogin");
const btnFecharLogin = document.getElementById("fecharLogin");

btnAbrirCad.addEventListener("click", function () {
    DialogCad.showModal();
});

btnFecharCad.addEventListener("click", function () {
    DialogCad.close();
});

btnAbrirLogin.addEventListener("click", function () {
    DialogLogin.showModal();
});

btnFecharLogin.addEventListener("click", function () {
    DialogLogin.close();

    //oi deixa eu adicionar meu trava se não as perguntas não são registradas

document.getElementById("formCad").addEventListener("submit", function (e) {
    e.preventDefault();
    const dados = {
        nome: document.getElementById("nomeCD").value,
        idade: document.getElementById("idade").value,
        tempo_redes: document.querySelector('input[name="tempo_redes"]:checked').value
    };
    sessionStorage.setItem("participante", JSON.stringify(dados));
    window.location.href = "../Video/index.html";
});
});