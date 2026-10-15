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
});