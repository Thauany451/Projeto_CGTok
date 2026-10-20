// CGTOK - Analise de Atencao (Slop vs Cult)

// ===============================
// ESTADO E CRONOMETROS
// ===============================
console.log("SCRIPT DE ANÁLISE DE ATENÇÃO FUNCIONANDO!");

let interacoes = 0;
let limite = 10; // Número máximo de trocas de vídeo antes do relatório

// Marcadores de tempo (timestamps em milissegundos)
let tempoInicioSessao = Date.now();
let tempoInicioVideo = Date.now();

// Acumuladores de tempo (em segundos)
let tempoPorCategoria = {
    "Slop": 0,
    "Cult": 0
};

// Contadores de visualizações por categoria
let visualizacoesPorCategoria = {
    "Slop": 0,
    "Cult": 0
};

// ===============================
// VÍDEOS (Classificados em Slop e Cult)
// ===============================
let videos = [
    {
        arquivo: "videos/gato.mp4",
        tipo: "Slop", // Conteúdo Slop/Fútil
        titulo: "Olha esse gato engraçado! 🐱",
        criador: "@mundoanimal",
        tags: "#animais #gatos #fofo #viral",
        musica: "Som original - Mundo Animal",
        curtidas: "12 mil",
        comentarios: "250"
    },
    {
        arquivo: "videos/cachorro.mp4",
        tipo: "Slop",
        titulo: "Cachorro de chapéu dançando 🐶",
        criador: "@mundoanimal",
        tags: "#animais #cães #memes",
        musica: "Som original - Mundo Animal",
        curtidas: "7.2 mil",
        comentarios: "98"
    },
    {
        arquivo: "videos/fonteAmarela.mp4",
        tipo: "Cult", // Conteúdo Cult/Útil/Reflexivo
        titulo: "Reflexão Filosófica sobre o Tempo 🧠",
        criador: "@pensamento_critico",
        tags: "#filosofia #sabedoria #cult",
        musica: "For the First Time - DeMarco",
        curtidas: "18.5 mil",
        comentarios: "512"
    },
    {
        arquivo: "videos/ManualDoMundoA4.mp4",
        tipo: "Cult", // Conteúdo Cult/Útil/Reflexivo
        titulo: "O que PAPEL A4 tem a ver com a RAIZ de 2?",
        criador: "@ManualDoMundo",
        tags: "#Curisosidades #VocêSabia #PapelA4",
        musica: "Som original - ManualDoMundo",
        curtidas: "18.5 mil",
        comentarios: "512"
    }
];

let videoAtual = 0;
//let embaralhar = (array) => array.sort(() => Math.random() - 0.5);



// ===============================
// ELEMENTOS DO HTML
// ===============================
let video = document.getElementById("video");
let videoSource = document.getElementById("video-source");
let descricao = document.getElementById("descricao");
let criador = document.getElementById("criador");
let tags = document.getElementById("tags");
let musica = document.getElementById("musica");
let curtidas = document.getElementById("curtidas");
let comentarios = document.getElementById("comentarios");
let botaoCurtir = document.getElementById("botaoCurtir");

// ===============================
// REGISTRO DE TEMPO DO VÍDEO
// ===============================
function registrarTempoAtual() {
    if (!tempoInicioVideo) return;

    let agora = Date.now();
    let tempoGastoSegundos = (agora - tempoInicioVideo) / 1000;
    let atual = videos[videoAtual];

    if (atual && atual.tipo) {
        tempoPorCategoria[atual.tipo] += tempoGastoSegundos;
        visualizacoesPorCategoria[atual.tipo]++;
        console.log(`⏱️ Registrado ${tempoGastoSegundos.toFixed(1)}s no vídeo "${atual.titulo}" [${atual.tipo}]`);
    }
}

// ===============================
// MOSTRAR VÍDEO
// ===============================
function mostrarVideo() {
    let atual = videos[videoAtual];
    //let embaralhar = (array) => array.sort(() => Math.random() - 0.5);

    
    videoSource.src = atual.arquivo;
    video.load();
    video.play();

    descricao.textContent = atual.titulo;
    criador.textContent = atual.criador;
    tags.textContent = atual.tags;
    musica.textContent = atual.musica;
    curtidas.textContent = atual.curtidas;
    comentarios.textContent = atual.comentarios;

    // Reseta cor do coracao de curtida
    if (botaoCurtir.querySelector("i")) {
        botaoCurtir.querySelector("i").style.color = "";
    }

    // Reinicia o cronômetro para o novo vídeo
    tempoInicioVideo = Date.now();
}

// ===============================
// CONTROLE DE NAVEGAÇÃO
// ===============================
function proximoVideo() {
    registrarTempoAtual();
    interacoes++;

    let avisoLimite = 
    `
    ========================================
    Quer pegar um copo de água?
    Você atingiu seu limite diário.
    ========================================
    `

    if (interacoes >= limite) {
        //mostrarResultado(); Aqui ele tá querendo já mostrar os resultados, mas vamos deixar isso para o pós-quiz. 
        // PASSANDO POR CIMA 🙄
        //mostrarResultado();
sessionStorage.setItem("atencao", JSON.stringify({
    tempoPorCategoria: tempoPorCategoria,
    visualizacoesPorCategoria: visualizacoesPorCategoria,
    tempoTotalSessao: (Date.now() - tempoInicioSessao) / 1000
}));
window.location.href = "../Questionario/Perguntas.html";
         //alert(avisoLimite)
        return;
    }

    // Avança em ciclo para o próximo vídeo
    videoAtual = (videoAtual + 1) % videos.length;
    mostrarVideo();
}

function videoAnterior() {
    registrarTempoAtual();

    videoAtual--;
    if (videoAtual < 0) {
        videoAtual = videos.length - 1;
    }
    mostrarVideo();
}

function curtir() {
    if (botaoCurtir.querySelector("i")) {
        botaoCurtir.querySelector("i").style.color = "#fe2c55";
    }
}

// ===============================
// APRESENTAÇÃO DOS RESULTADOS
// ===============================

function mostrarResultado() {
    // Pausa o vídeo
    video.pause();

    // Tempo total de sessão em segundos
    let tempoTotalSessao = ((Date.now() - tempoInicioSessao) / 1000).toFixed(1);
    let tempoSlop = tempoPorCategoria["Slop"].toFixed(1);
    let tempoCult = tempoPorCategoria["Cult"].toFixed(1);

    // Média de tempo por visualização
    let mediaSlop = visualizacoesPorCategoria["Slop"] > 0
        ? (tempoPorCategoria["Slop"] / visualizacoesPorCategoria["Slop"]).toFixed(1)
        : "0.0";

    let mediaCult = visualizacoesPorCategoria["Cult"] > 0
        ? (tempoPorCategoria["Cult"] / visualizacoesPorCategoria["Cult"]).toFixed(1)
        : "0.0";

    let veredito = parseFloat(tempoSlop) > parseFloat(tempoCult)
        ? "🚨 Sua atenção foi predominantemente capturada por conteúdos Slop (Fúteis)."
        : "🧠 Você manteve o foco por mais tempo em conteúdos Cult (Úteis).";

    let relatorio = 

`========================================
📊 RELATÓRIO DE ATENÇÃO DO USUÁRIO
========================================

⏱️ Tempo Total da Sessão: ${tempoTotalSessao}s

🗑️ CONTEÚDO SLOP (Fútil):
• Tempo acumulado: ${tempoSlop}s
• Média por vídeo: ${mediaSlop}s

📚 CONTEÚDO CULT (Útil):
• Tempo acumulado: ${tempoCult}s
• Média por vídeo: ${mediaCult}s

🔍 DIAGNÓSTICO:
${veredito}
========================================`;

    console.log(relatorio);
    alert(relatorio);
}
// ===============================
// INICIAR APLICAÇÃO
// ===============================
mostrarVideo();