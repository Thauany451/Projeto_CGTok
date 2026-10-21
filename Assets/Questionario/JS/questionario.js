document.body.classList.add('js');

const perguntas = document.querySelectorAll('.pergunta');
const btnProxima = document.getElementById('proxima');
const btnEnviar = document.getElementById('enviar');
const barra = document.getElementById('barra');
const contador = document.getElementById('contador');

let atual = 0;

function respondida() {
    return perguntas[atual].querySelector('input:checked') !== null;
}

function atualizar() {
    perguntas.forEach(function (p, i) {
        p.classList.toggle('ativa', i === atual);
    });

    const ultima = atual === perguntas.length - 1;
    contador.textContent = 'Pergunta ' + (atual + 1) + ' de ' + perguntas.length;
    barra.value = atual + 1;
    btnProxima.hidden = ultima;
    btnEnviar.hidden = !ultima;
    btnProxima.disabled = !respondida();
    btnEnviar.disabled = !respondida();
}

perguntas.forEach(function (p) {
    p.addEventListener('change', atualizar);
});

btnProxima.addEventListener('click', function () {
    if (respondida() && atual < perguntas.length - 1) {
        atual++;
        atualizar();
    }
});

atualizar();