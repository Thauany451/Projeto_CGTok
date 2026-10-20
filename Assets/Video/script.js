// CGTOK - Analise de Atencao (Slop vs Cult)

// ===============================
// ESTADO E CRONOMETROS
// ===============================
console.log("SCRIPT DE ANÁLISE DE ATENÇÃO FUNCIONANDO!");

let interacoes = 0;
let limite = videos.length; // Número máximo de trocas de vídeo antes do relatório

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
        arquivo: "../../Assets/Video/videos/gato.mp4",
        tipo: "Slop", // Conteúdo Slop/Fútil
        titulo: "Olha esse gato engraçado! 🐱",
        criador: "@mundoanimal",
        tags: "#animais #gatos #fofo #viral",
        musica: "Som original - Mundo Animal",
        curtidas: "12 mil",
        comentarios: "250"
    },
    {
        arquivo: "../../Assets/Video/videos/cachorro.mp4",
        tipo: "Slop",
        titulo: "Cachorro de chapéu dançando 🐶",
        criador: "@mundoanimal",
        tags: "#animais #cães #memes",
        musica: "Som original - Mundo Animal",
        curtidas: "7.2 mil",
        comentarios: "98"
    },
    {
        arquivo: "../../Assets/Video/videos/fonteAmarela.mp4",
        tipo: "Cult", // Conteúdo Cult/Útil/Reflexivo
        titulo: "Reflexão Filosófica sobre o Tempo 🧠",
        criador: "@pensamento_critico",
        tags: "#filosofia #sabedoria #cult",
        musica: "For the First Time - DeMarco",
        curtidas: "18.5 mil",
        comentarios: "512"
    },
    {
        arquivo: "../../Assets/Video/videos/ManualDoMundoA4.mp4",
        tipo: "Cult", // Conteúdo Cult/Útil/Reflexivo
        titulo: "O que PAPEL A4 tem a ver com a RAIZ de 2?",
        criador: "@ManualDoMundo",
        tags: "#Curiosidades #VocêSabia #PapelA4",
        musica: "Som original - ManualDoMundo",
        curtidas: "18.5 mil",
        comentarios: "512"
    },
    {
        arquivo: "../../Assets/Video/videos/asmrgizcomgiz.mp4",
        tipo: "Cult",
        titulo: "Metade de 1/3?",
        criador: "@Giscomgiz",
        tags: "#Fração #Matemática",
        musica: "Som original - Gis com Giz",
        curtidas: "6.4 mil",
        comentarios: "127"
    },
    {
        arquivo: "../../Assets/Video/videos/anawoycick.mp4",
        tipo: "Slop",
        titulo:"Você não vai acreditar nisso", 
        criador: "@AnaWoycick",
        tags:"#TaylorSwift #Russia #viral #surpreendente",
        musica: "Som original - Ana Woycick",
        curtidas: "10.1 mil",
        comentarios: "500"
    },
    {
        arquivo: "../../Assets/Video/videos/cachorrinhorindo.mp4",
        tipo: "Slop",
        titulo: "Pra dormir feliz",
        criador: "@videosfofos238754",
        tags: "#cachorro #edit #ninar",
        musica: "Som original - videosfofos238754",
        curtidas: "1.067",
        comentarios: "213"
    },
    {
        arquivo: "../../Assets/Video/videos/gatinhodancando.mp4",
        tipo: "Slop",
        titulo: "olha oq eu achei na minha cozinhaaaa",
        criador: "@videossurpreendentes",
        tags: "#gato #medo #surpreendente",
        musica: "Som original - videossurpreendentes",
        curtidas: "1.783",
        comentarios: "23"
    },
    {
        arquivo: "../../Assets/Video/videos/natalino.mp4",
        tipo: "Slop",
        titulo: "O I já tá garantido rsrs",
        criador: "@VidaDeEstudante",
        tags: "#Química #Trend #Humor #PapaiNoel #Etec",
        musica: "Som original - VidaDeEstudante",
        curtidas: "1.067",
        comentarios: "213"
    },
    {
        arquivo: "../../Assets/Video/videos/peppacaindo.mp4",
        tipo: "Slop",
        titulo: "O George caindo Skskskk",
        criador: "@VidaDeEstudante",
        tags: "#GeorgePig #PeppaPig #Quedas",
        musica: "Som original - VidaDeEstudante",
        curtidas: "6.750",
        comentarios: "574"
    },
    {
        arquivo: "../../Assets/Video/videos/rainbowdashbrinquedo.mp4",
        tipo: "Slop",
        titulo: "Abrindo o brinquedo da Rainbow Dash de My Litlle Pony",
        criador: "@AbrindoBrinquedos",
        tags: "#Brinquedo #Massinha #MLP",
        musica: "Som original - AbrindoBrinquedos",
        curtidas: "13.067",
        comentarios: "749"
    },
    {
        arquivo: "../../Assets/Video/videos/singleladies.mp4",
        tipo: "Slop",
        titulo: "Mn e meu cachorro dançando com a gente hahaha",
        criador: "@dancecomigo",
        tags: "#cachorro #dança #Beyonce #SingleLadies",
        musica: "Som original - videosfofos238754",
        curtidas: "1.067",
        comentarios: "213"
    },
    {
        arquivo: "../../Assets/Video/videos/sunshine.mp4",
        tipo: "Slop",
        titulo: "galniha",
        criador: "@videosfofos238754",
        tags: "#bomdia #edit #galinha",
        musica: "Som original - videosfofos238754",
        curtidas: "1.894",
        comentarios: "321"
    },
    {
        arquivo: "../../Assets/Video/videos/tuntunsahur.mp4",
        tipo: "Slop",
        titulo: "OBRIGADO POR ASSISTIR!",
        criador: "@obrigadoporassistir",
        tags: "#obrigado #por #assistir",
        musica: "Som original - obrigadoporassistir",
        curtidas: "2m",
        comentarios: "89.7 mil"
    }

];

function embaralharVideos(lista) {
    const resultado = [...lista];
    // Separa os videos
    const meio = resultado.slice(1, -1);

    // Embaralha os videos
    for (let i = meio.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [meio[i], meio[j]] = [meio[j], meio[i]];
    }

    // primeiro e ultimo nas posicoes originais
    return [
        resultado[0],
        ...meio,
        resultado[resultado.length - 1]
    ];
}

videos = embaralharVideos(videos);

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
let videoAtual = 0;
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


const botaoCreditos = document.getElementById("botaoCreditos");
const painelCreditos = document.getElementById("painelCreditos");
const fecharCreditos = document.getElementById("fecharCreditos");

let videoEstavaTocando = false;

botaoCreditos.addEventListener("click", function (evento) {
    evento.preventDefault();

    videoEstavaTocando = !video.paused;
    video.pause();

    painelCreditos.classList.add("aberto");
});

fecharCreditos.addEventListener("click", function () {
    painelCreditos.classList.remove("aberto");

    if (videoEstavaTocando) {
        video.play().catch(() => {});
    }
});


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
        alert(avisoLimite); //O Aviso do limite de tempo de tela é importante 🙄
        mostrarResultado();

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

    //console.log(relatorio);
    //alert(relatorio);

    // =============================== Parte de enviar os dados para o PHP ===============================
let dadosParaEnviar = {
    tempoTotal: ((Date.now() - tempoInicioSessao) / 1000).toFixed(1),
    tempoSlop: tempoPorCategoria["Slop"].toFixed(1),
    tempoCult: tempoPorCategoria["Cult"].toFixed(1),
    viewsSlop: visualizacoesPorCategoria["Slop"],
    viewsCult: visualizacoesPorCategoria["Cult"],
    totalInteracoes: interacoes,

    mediaSlop: visualizacoesPorCategoria["Slop"] > 0
        ? (tempoPorCategoria["Slop"] / visualizacoesPorCategoria["Slop"]).toFixed(1)
        : "0.0",
    mediaCult: visualizacoesPorCategoria["Cult"] > 0
        ? (tempoPorCategoria["Cult"] / visualizacoesPorCategoria["Cult"]).toFixed(1)
        : "0.0"
};

// Enviando via POST para o arquivo PHP da Thay
fetch('../../Includes/salvar_dados.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosParaEnviar)
})
.then(response => response.json())
.then(data => {
    console.log("Dados enviados com sucesso para o PHP!", data);
})
.catch(error => {
    console.error("Erro ao enviar dados:", error);
})
.finally(() => {
    window.location.href = '/Views/Questionario/questionario.php';
});
}


// ===============================
// INICIAR APLICAÇÃO
// ===============================
mostrarVideo();