// 🏴‍☠️ LUFFY BOT
// 🎯 ADIVINHE O NÚMERO — versão melhorada

const jogos = {};

const niveis = {
    facil: {
        nome: "🟢 FÁCIL",
        max: 10,
        pontos: 10
    },

    medio: {
        nome: "🟡 MÉDIO",
        max: 50,
        pontos: 25
    },

    dificil: {
        nome: "🔴 DIFÍCIL",
        max: 100,
        pontos: 50
    },

    luffy: {
        nome: "🏴‍☠️ LUFFY",
        max: 1000,
        pontos: 100
    }
};

function pegarTexto(msg) {

    return (
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        ""
    );
}

function numeroAleatorio(max) {

    return Math.floor(
        Math.random() * max
    ) + 1;
}

function nomeJogador(msg) {

    return (
        msg.pushName ||
        "Pirata"
    );
}

module.exports = {

    nome: "adivinhar",
    comando: "adivinhar",

    executar: async (sock, msg) => {

        const id =
            msg.key.remoteJid;

        const texto =
            pegarTexto(msg).trim();

        const partes =
            texto.split(/\s+/);

        partes.shift();

        const jogador =
            nomeJogador(msg);

        const acao =
            partes[0]?.toLowerCase() || "";


        // =================================================
        // AJUDA
        // =================================================

        if (
            acao === "ajuda" ||
            acao === "help"
        ) {

            return sock.sendMessage(id, {
                text:
`🎯 *ADIVINHE O NÚMERO*
🏴‍☠️ Luffy Bot

━━━━━━━━━━━━━━━━━━━━

🎮 *COMO JOGAR*

Primeiro escolha uma dificuldade:

🟢 !adivinhar facil
🟡 !adivinhar medio
🔴 !adivinhar dificil
🏴‍☠️ !adivinhar luffy

Depois dê seu palpite:

🎯 !adivinhar 7

━━━━━━━━━━━━━━━━━━━━

📊 *COMANDOS*

!adivinhar
!adivinhar facil
!adivinhar medio
!adivinhar dificil
!adivinhar luffy
!adivinhar 50
!adivinhar dica
!adivinhar desistir
!adivinhar placar

━━━━━━━━━━━━━━━━━━━━

🔥 Quanto mais difícil,
maior a recompensa!`
            });
        }


        // =================================================
        // PLACAR
        // =================================================

        if (
            acao === "placar" ||
            acao === "ranking"
        ) {

            const ranking =
                Object.entries(
                    jogos[id]?.ranking || {}
                ).sort(
                    (a, b) => b[1] - a[1]
                );

            if (!ranking.length) {

                return sock.sendMessage(id, {
                    text:
`🏆 *PLACAR*

Ainda não existem pontos neste jogo.

🎯 Comece com:

!adivinhar`
                });
            }

            return sock.sendMessage(id, {
                text:
`🏆 *RANKING — ADIVINHE O NÚMERO*
━━━━━━━━━━━━━━━━━━━━

${ranking.map(
    ([nome, pontos], i) =>
`${i + 1}. ${nome} — ⭐ ${pontos}`
).join("\n")}

━━━━━━━━━━━━━━━━━━━━`
            });
        }


        // =================================================
        // DESISTIR
        // =================================================

        if (
            acao === "desistir" ||
            acao === "parar" ||
            acao === "stop"
        ) {

            if (!jogos[id]?.jogadores?.[jogador]) {

                return sock.sendMessage(id, {
                    text:
`⚠️ *VOCÊ NÃO ESTÁ JOGANDO!*

Use:

!adivinhar`
                });
            }

            const jogo =
                jogos[id].jogadores[jogador];

            delete jogos[id].jogadores[jogador];

            return sock.sendMessage(id, {
                text:
`🏳️ *VOCÊ DESISTIU!*

🎯 O número era:
*${jogo.secreto}*

Boa tentativa, ${jogador}! 😂`
            });
        }


        // =================================================
        // DICA
        // =================================================

        if (acao === "dica") {

            const jogo =
                jogos[id]?.jogadores?.[jogador];

            if (!jogo) {

                return sock.sendMessage(id, {
                    text:
`⚠️ Você ainda não começou um jogo.

Use:

!adivinhar`
                });
            }

            const metade =
                Math.floor(jogo.max / 2);

            let dica;

            if (jogo.secreto <= metade) {

                dica =
`💡 O número está entre *1 e ${metade}*.`;

            } else {

                dica =
`💡 O número está entre *${metade + 1} e ${jogo.max}*.`;
            }

            return sock.sendMessage(id, {
                text:
`🧠 *DICA DO LUFFY*

${dica}

🎯 Tentativas:
*${jogo.tentativas}*`
            });
        }


        // =================================================
        // ESCOLHER NÍVEL
        // =================================================

        if (niveis[acao]) {

            const nivel =
                niveis[acao];

            if (!jogos[id]) {

                jogos[id] = {
                    jogadores: {},
                    ranking: {}
                };
            }

            jogos[id].jogadores[jogador] = {

                secreto:
                    numeroAleatorio(
                        nivel.max
                    ),

                max:
                    nivel.max,

                nivel:
                    nivel.nome,

                pontos:
                    nivel.pontos,

                tentativas: 0,

                historico: [],

                dicaUsada: false
            };

            return sock.sendMessage(id, {
                text:
`🎯 *ADIVINHE O NÚMERO*
🏴‍☠️

━━━━━━━━━━━━━━━━━━━━

${nivel.nome}

Escolhi um número de:

*1 até ${nivel.max}*

🎁 Recompensa:
⭐ ${nivel.pontos} pontos

━━━━━━━━━━━━━━━━━━━━

👤 Jogador:
*${jogador}*

Agora tente:

🎯 *!adivinhar número*

Exemplo:

*!adivinhar 7*

💡 Pode usar:
*!adivinhar dica*

🏳️ Para desistir:
*!adivinhar desistir*`
            });
        }


        // =================================================
        // INICIAR SEM NÍVEL
        // =================================================

        if (!acao) {

            if (!jogos[id]) {

                jogos[id] = {
                    jogadores: {},
                    ranking: {}
                };
            }

            if (
                jogos[id].jogadores[jogador]
            ) {

                return sock.sendMessage(id, {
                    text:
`🎯 *SEU JOGO JÁ ESTÁ ATIVO!*

${jogos[id].jogadores[jogador].nivel}

Tente um número entre:

*1 e ${jogos[id].jogadores[jogador].max}*

Exemplo:

*!adivinhar 5*`
                });
            }

            const nivel =
                niveis.facil;

            jogos[id].jogadores[jogador] = {

                secreto:
                    numeroAleatorio(
                        nivel.max
                    ),

                max:
                    nivel.max,

                nivel:
                    nivel.nome,

                pontos:
                    nivel.pontos,

                tentativas: 0,

                historico: [],

                dicaUsada: false
            };

            return sock.sendMessage(id, {
                text:
`🎯 *ADIVINHE O NÚMERO*
🏴‍☠️

Escolhi um número de:

*1 a 10!*

👤 Jogador:
*${jogador}*

🎯 Tente:

*!adivinhar 6*

━━━━━━━━━━━━━━━━━━━━

💡 Para escolher dificuldade:

🟢 !adivinhar facil
🟡 !adivinhar medio
🔴 !adivinhar dificil
🏴‍☠️ !adivinhar luffy`
            });
        }


        // =================================================
        // PALPITE
        // =================================================

        const palpite =
            Number(acao);

        if (
            !Number.isInteger(palpite)
        ) {

            return sock.sendMessage(id, {
                text:
`❌ *PALPITE INVÁLIDO!*

Digite apenas um número.

Exemplo:

🎯 !adivinhar 6

Ou veja as dificuldades:

!adivinhar ajuda`
            });
        }


        // =================================================
        // VERIFICAR JOGO
        // =================================================

        if (!jogos[id]) {

            return sock.sendMessage(id, {
                text:
`⚠️ *NENHUM JOGO ATIVO!*

Comece com:

!adivinhar`
            });
        }


        if (
            !jogos[id].jogadores[jogador]
        ) {

            return sock.sendMessage(id, {
                text:
`⚠️ *VOCÊ NÃO ESTÁ JOGANDO!*

Comece com:

!adivinhar`
            });
        }


        const jogo =
            jogos[id].jogadores[jogador];


        // =================================================
        // VALIDAR LIMITE
        // =================================================

        if (
            palpite < 1 ||
            palpite > jogo.max
        ) {

            return sock.sendMessage(id, {
                text:
`❌ *NÚMERO INVÁLIDO!*

Seu nível permite números de:

*1 até ${jogo.max}*`
            });
        }


        // =================================================
        // EVITAR REPETIÇÃO
        // =================================================

        if (
            jogo.historico.includes(palpite)
        ) {

            return sock.sendMessage(id, {
                text:
`⚠️ Você já tentou o número *${palpite}*!

Tente outro número. 🎯`
            });
        }


        jogo.historico.push(palpite);
        jogo.tentativas++;


        // =================================================
        // ACERTOU
        // =================================================

        if (
            palpite === jogo.secreto
        ) {

            let bonus = 0;

            if (jogo.tentativas === 1) {
                bonus = 20;
            }

            const total =
                jogo.pontos + bonus;


            jogos[id].ranking[jogador] =
                (
                    jogos[id].ranking[jogador] ||
                    0
                ) + total;


            delete jogos[id].jogadores[jogador];


            return sock.sendMessage(id, {
                text:
`🏆 *ACERTOU!*
🏴‍☠️🎯

━━━━━━━━━━━━━━━━━━━━

🎯 Número secreto:
*${jogo.secreto}*

👤 Jogador:
*${jogador}*

🔥 Tentativas:
*${jogo.tentativas}*

⭐ Pontos:
*+${total}*

${bonus
    ? "⚡ BÔNUS DE PRIMEIRA TENTATIVA: +20"
    : ""}

━━━━━━━━━━━━━━━━━━━━

🎉 *PARABÉNS, PIRATA!*

🏴‍☠️ O Luffy está orgulhoso!

📊 Veja seu ranking:

*!adivinhar placar*`
            });
        }


        // =================================================
        // ERRO — MENOR
        // =================================================

        if (
            palpite > jogo.secreto
        ) {

            return sock.sendMessage(id, {
                text:
`❌ *ERROU!*

🎯 Seu número:
*${palpite}*

💡 O número secreto é *MENOR*.

🔥 Tentativas:
*${jogo.tentativas}*

Tente novamente!`
            });
        }


        // =================================================
        // ERRO — MAIOR
        // =================================================

        return sock.sendMessage(id, {
            text:
`❌ *ERROU!*

🎯 Seu número:
*${palpite}*

💡 O número secreto é *MAIOR*.

🔥 Tentativas:
*${jogo.tentativas}*

Tente novamente!`
        });
    }
};
