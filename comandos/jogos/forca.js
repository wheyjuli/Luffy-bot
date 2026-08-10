// 🏴‍☠️ LUFFY BOT
// 🔤 JOGO DA FORCA — versão melhorada

const jogos = {};
const pontuacao = {};
let ultimaPalavra = null;

const boneco = [
` +---+
 |   |
     |
     |
     |
=========`,
` +---+
 |   |
 O   |
     |
     |
=========`,
` +---+
 |   |
 O   |
 |   |
     |
=========`,
` +---+
 |   |
 O   |
/|   |
     |
=========`,
` +---+
 |   |
 O   |
/|\\  |
     |
=========`,
` +---+
 |   |
 O   |
/|\\  |
/    |
=========`,
` +---+
 |   |
 O   |
/|\\  |
/ \\  |
=========`
];

const palavras = [

    {
        palavra: "LUFFY",
        dica: "Capitão dos Chapéus de Palha 🍖",
        categoria: "One Piece"
    },

    {
        palavra: "ZORO",
        dica: "Espadachim que usa três espadas ⚔️",
        categoria: "One Piece"
    },

    {
        palavra: "NAMI",
        dica: "Navegadora dos Chapéus de Palha 🗺️",
        categoria: "One Piece"
    },

    {
        palavra: "SANJI",
        dica: "Cozinheiro que luta usando as pernas 🍳",
        categoria: "One Piece"
    },

    {
        palavra: "CHOPPER",
        dica: "Médico rena da tripulação 🦌",
        categoria: "One Piece"
    },

    {
        palavra: "BROOK",
        dica: "Músico esqueleto da tripulação 🎸",
        categoria: "One Piece"
    },

    {
        palavra: "FRANKY",
        dica: "Ciborgue construtor do Sunny 🤖",
        categoria: "One Piece"
    },

    {
        palavra: "ROBIN",
        dica: "Arqueóloga dos Chapéus de Palha 📚",
        categoria: "One Piece"
    },

    {
        palavra: "USOPP",
        dica: "Atirador e grande contador de histórias 🎯",
        categoria: "One Piece"
    },

    {
        palavra: "JINBE",
        dica: "Timoneiro homem-peixe 🌊",
        categoria: "One Piece"
    },

    {
        palavra: "SHANKS",
        dica: "Capitão dos Piratas do Ruivo 🍷",
        categoria: "One Piece"
    },

    {
        palavra: "ACE",
        dica: "Irmão de Luffy que controla fogo 🔥",
        categoria: "One Piece"
    },

    {
        palavra: "KAIDO",
        dica: "Um dos antigos Yonkou 🐉",
        categoria: "One Piece"
    },

    {
        palavra: "BUGGY",
        dica: "Capitão conhecido pelo nariz vermelho 🤡",
        categoria: "One Piece"
    },

    {
        palavra: "MIHAWK",
        dica: "Grande espadachim do mundo ⚔️",
        categoria: "One Piece"
    },

    {
        palavra: "AKUMA",
        dica: "Fruta que concede poderes especiais 🍎",
        categoria: "One Piece"
    },

    {
        palavra: "GRANDLINE",
        dica: "Grande rota marítima 🌊",
        categoria: "One Piece"
    },

    {
        palavra: "THOUSANDSUNNY",
        dica: "Navio dos Chapéus de Palha 🚢",
        categoria: "One Piece"
    },

    {
        palavra: "PIRATA",
        dica: "Quem navega pelos mares atrás de aventuras 🏴‍☠️",
        categoria: "Piratas"
    },

    {
        palavra: "TESOURO",
        dica: "Algo valioso escondido ou procurado 💰",
        categoria: "Aventura"
    },

    {
        palavra: "DRAGAO",
        dica: "Criatura lendária que cospe fogo 🐉",
        categoria: "Fantasia"
    },

    {
        palavra: "TIGRE",
        dica: "Grande felino listrado 🐯",
        categoria: "Animais"
    },

    {
        palavra: "ELEFANTE",
        dica: "Maior animal terrestre 🐘",
        categoria: "Animais"
    },

    {
        palavra: "CACHORRO",
        dica: "Melhor amigo do ser humano 🐶",
        categoria: "Animais"
    },

    {
        palavra: "GATO",
        dica: "Animal conhecido por miar 🐱",
        categoria: "Animais"
    },

    {
        palavra: "PIZZA",
        dica: "Comida redonda muito popular 🍕",
        categoria: "Comida"
    },

    {
        palavra: "HAMBURGUER",
        dica: "Lanche com pão, carne e outros ingredientes 🍔",
        categoria: "Comida"
    },

    {
        palavra: "CHOCOLATE",
        dica: "Doce feito a partir do cacau 🍫",
        categoria: "Comida"
    },

    {
        palavra: "PIPOCA",
        dica: "Comida muito comum no cinema 🍿",
        categoria: "Comida"
    },

    {
        palavra: "SORVETE",
        dica: "Doce gelado 🍦",
        categoria: "Comida"
    }

];

function pegarTexto(msg) {

    return (
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        msg.message?.videoMessage?.caption ||
        ""
    );

}

function escolherPalavra() {

    let disponiveis = palavras.filter(
        p => p.palavra !== ultimaPalavra
    );

    if (!disponiveis.length) {
        disponiveis = palavras;
    }

    const escolhida =
        disponiveis[
            Math.floor(Math.random() * disponiveis.length)
        ];

    ultimaPalavra = escolhida.palavra;

    return escolhida;

}

function mostrarPalavra(jogo) {

    return jogo.palavra
        .split("")
        .map(letra =>
            jogo.letras.includes(letra)
                ? letra
                : "▢"
        )
        .join(" ");

}

function porcentagem(jogo) {

    const total =
        jogo.palavra.length;

    const descobertas =
        jogo.palavra
            .split("")
            .filter(
                letra => jogo.letras.includes(letra)
            ).length;

    return Math.round(
        (descobertas / total) * 100
    );

}

function placar(id) {

    return pontuacao[id] || 0;

}

function mensagemJogo(jogo) {

    return `🔤 *FORCA DA GRAND LINE* 🏴‍☠️

━━━━━━━━━━━━━━━━━━

🗂️ Categoria:
*${jogo.categoria}*

${boneco[jogo.erros]}

🎯 Palavra:

*${mostrarPalavra(jogo)}*

💡 Dica:
${jogo.dica}

━━━━━━━━━━━━━━━━━━

❌ Erros:
*${jogo.erros}/6*

🔤 Letras usadas:
${jogo.letras.length
    ? jogo.letras.join(" • ")
    : "Nenhuma"}

📊 Progresso:
*${porcentagem(jogo)}%*

🏆 Pontos:
*${placar(jogo.id)}*

━━━━━━━━━━━━━━━━━━

Digite uma letra:

*!forca A*

Ou tente a palavra inteira:

*!forca LUFFY*

🛑 Para sair:

*!forca sair*`;

}

module.exports = {

    nome: "forca",
    comando: "forca",

    executar: async (sock, msg) => {

        const id =
            msg.key.remoteJid;

        const texto =
            pegarTexto(msg).trim();

        let tentativa =
            texto
                .replace(/^!forca/i, "")
                .trim()
                .toUpperCase();

        // =========================
        // SAIR
        // =========================

        if (
            tentativa === "SAIR" ||
            tentativa === "PARAR"
        ) {

            if (!jogos[id]) {

                return sock.sendMessage(id, {
                    text:
`⚠️ Você não está jogando.

Use:

!forca`
                });

            }

            delete jogos[id];

            return sock.sendMessage(id, {
                text:
`🏳️ *FORCA ENCERRADA!*

Até a próxima, nakama! 🏴‍☠️`
            });

        }

        // =========================
        // INICIAR
        // =========================

        if (!jogos[id]) {

            const escolhido =
                escolherPalavra();

            jogos[id] = {

                id,

                palavra:
                    escolhido.palavra,

                dica:
                    escolhido.dica,

                categoria:
                    escolhido.categoria,

                letras: [],

                erros: 0

            };

            return sock.sendMessage(id, {
                text:
`🏴‍☠️ *DESAFIO DA FORCA*

━━━━━━━━━━━━━━━━━━

🔥 Uma nova palavra foi escolhida!

🗂️ Categoria:
*${escolhido.categoria}*

💡 Dica:
${escolhido.dica}

🎯 Palavra:

*${mostrarPalavra(jogos[id])}*

━━━━━━━━━━━━━━━━━━

❤️ Você possui *6 tentativas*.

Digite:

*!forca A*

ou tente a palavra:

*!forca LUFFY*

🛑 Sair:

*!forca sair*`
            });

        }

        const jogo =
            jogos[id];

        // =========================
        // SEM TENTATIVA
        // =========================

        if (!tentativa) {

            return sock.sendMessage(id, {
                text:
`⚠️ *DIGITE UMA TENTATIVA!*

Exemplo:

*!forca A*

ou:

*!forca LUFFY*`
            });

        }

        // =========================
        // PALAVRA INTEIRA
        // =========================

        if (tentativa.length > 1) {

            if (
                tentativa === jogo.palavra
            ) {

                pontuacao[id] =
                    placar(id) + 100;

                const pontos =
                    placar(id);

                delete jogos[id];

                return sock.sendMessage(id, {
                    text:
`🏆 *VOCÊ VENCEU!* 🏴‍☠️🔥

━━━━━━━━━━━━━━━━━━

🎯 Palavra:
*${tentativa}*

💰 Recompensa:
*+100 pontos*

🏆 Seu placar:
*${pontos} pontos*

━━━━━━━━━━━━━━━━━━

🍖 O Luffy está orgulhoso!

Digite:

*!forca*

para jogar novamente.`
                });

            }

            jogo.erros++;

            return finalizarOuContinuar(
                sock,
                id,
                jogo,
                `❌ Você errou a palavra!`
            );

        }

        // =========================
        // LETRA REPETIDA
        // =========================

        if (
            jogo.letras.includes(tentativa)
        ) {

            return sock.sendMessage(id, {
                text:
`⚠️ Você já tentou a letra *${tentativa}*!

${mensagemJogo(jogo)}`
            });

        }

        jogo.letras.push(tentativa);

        // =========================
        // LETRA ERRADA
        // =========================

        if (
            !jogo.palavra.includes(tentativa)
        ) {

            jogo.erros++;

            return finalizarOuContinuar(
                sock,
                id,
                jogo,
                `❌ A letra *${tentativa}* não está na palavra.`
            );

        }

        // =========================
        // LETRA CERTA
        // =========================

        if (
            !mostrarPalavra(jogo).includes("▢")
        ) {

            pontuacao[id] =
                placar(id) + 50;

            const pontos =
                placar(id);

            const palavra =
                jogo.palavra;

            delete jogos[id];

            return sock.sendMessage(id, {
                text:
`🎉 *VOCÊ COMPLETOU A PALAVRA!* 🏴‍☠️

━━━━━━━━━━━━━━━━━━

🔤 Palavra:
*${palavra}*

💰 Recompensa:
*+50 pontos*

🏆 Seu placar:
*${pontos} pontos*

🔥 Excelente, nakama!`
            });

        }

        return sock.sendMessage(id, {
            text:
`✅ *BOA! A LETRA ESTÁ NA PALAVRA!*

${mensagemJogo(jogo)}`
        });

    }

};

async function finalizarOuContinuar(
    sock,
    id,
    jogo,
    mensagem
) {

    if (jogo.erros >= 6) {

        const palavra =
            jogo.palavra;

        delete jogos[id];

        return sock.sendMessage(id, {
            text:
`${mensagem}

☠️ *FIM DE JOGO!*

${boneco[6]}

━━━━━━━━━━━━━━━━━━

💀 A palavra era:

*${palavra}*

🏆 Placar:
*${placar(id)} pontos*

🏴‍☠️ Tente novamente, nakama!`
        });

    }

    return sock.sendMessage(id, {
        text:
`${mensagem}

${mensagemJogo(jogo)}`
    });

}
