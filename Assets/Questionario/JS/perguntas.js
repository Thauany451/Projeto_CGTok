// fonte: https://github.com/nmatei/simple-quiz-app
// só copiar e colar um bloco { } para fazer pergunta infinita

// grava no banco 
const URL_SALVAR = "../../Includes/salvar_dados.php";

let atual = 0;
let acertos = { inteligente: 0, bobo: 0, slop: 0 };
const caixa = document.getElementById("caixa");

function embaralhar(lista) {
    return lista.slice().sort(function () { return Math.random() - 0.5; });
}

function mostrar() {
    const p = perguntas[atual];
    caixa.innerHTML = "<h2>" + (atual + 1) + ". " + p.texto + "</h2>";
    embaralhar([p.certa].concat(p.erradas)).forEach(function (alt) {
        const b = document.createElement("button");
        b.className = "alt";
        b.textContent = alt;
        b.onclick = function () { responder(alt, b); };
        caixa.appendChild(b);
    });
}

function responder(escolhida, botao) {
    const p = perguntas[atual];
    document.querySelectorAll(".alt").forEach(function (b) {
        b.disabled = true;
        if (b.textContent === p.certa) b.classList.add("certa");
    });
    if (escolhida === p.certa) acertos[p.tipo]++; else botao.classList.add("errada");
    setTimeout(function () {
        atual++;
        if (atual < perguntas.length) mostrar(); else fim();
    }, 1000);
}

function fim() {
    const total = acertos.inteligente + acertos.bobo + acertos.slop;
    caixa.innerHTML = "<h2>Fim!</h2><h2>Acertos: " + total + " de " + perguntas.length + "</h2>";
    enviarResultado();
}

function enviarResultado() {
    // tempos atenção de cada tipo
    const atencao = JSON.parse(sessionStorage.getItem("atencao")) || {};
    const dados = new FormData();
    dados.append("inteligente", Math.round(atencao.inteligente || 0));
    dados.append("bobo", Math.round(atencao.bobo || 0));
    dados.append("slop", Math.round(atencao.slop || 0));
    dados.append("acerto_inteligente", acertos.inteligente);
    dados.append("acerto_bobo", acertos.bobo);
    dados.append("acerto_slop", acertos.slop);
    fetch(URL_SALVAR, { method: "POST", body: dados });
}

mostrar();