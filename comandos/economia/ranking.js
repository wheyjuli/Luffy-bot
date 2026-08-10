// 🏴‍☠️ LUFFY BOT
// 🏆 RANKING DOS PIRATAS — TOP 10

const fs = require("fs");

const dinheiroArquivo = "./database/dinheiro.json";
const trabalhoArquivo = "./database/trabalho.json";

function carregar(caminho) {

    try {

        if (!fs.existsSync(caminho)) {
            return {};
        }

        const texto =
            fs.readFileSync(caminho, "utf8").trim();

        if (!texto) {
            return {};
        }

        return JSON.parse(texto);

    } catch (erro) {

        console.error(
            `❌ Erro lendo ${caminho}:`,
            erro
        );

        return {};

    }

}

function formatar(numero) {

    return Number(numero || 0)
        .toLocaleString("pt-BR");

}

function nivelPorXP(xp) {

    return Math.floor(
        Math.sqrt(
            Number(xp || 0) / 100
        )
    ) + 1;

}

function nomeJogador(id) {

    if (!id) {
        return "Pirata desconhecido";
    }

    return id
        .split("@")[0]
        .replace(/[^0-9]/g, "");

}

module.exports = {

    nome: "ranking",
    comando: "ranking",

    executar: async (sock, msg) => {

        const chat =
            msg.key.remoteJid;

        const jogadorAtual =
            msg.key.participant ||
            chat;

        const dinheiro =
            carregar(dinheiroArquivo);

        const trabalhos =
            carregar(trabalhoArquivo);

        // ==========================
        // JUNTAR OS JOGADORES
        // ==========================

        const ids =
            new Set([
                ...Object.keys(dinheiro),
                ...Object.keys(trabalhos)
            ]);

        const ranking =
            [...ids]
                .map(id => {

                    const dadosTrabalho =
                        trabalhos[id] || {};

                    const fortuna =
                        Number(
                            dinheiro[id] || 0
                        );

                    const xp =
                        Number(
                            dadosTrabalho.xp || 0
                        );

                    return {

                        id,

                        fortuna,

                        xp,

                        nivel:
                            nivelPorXP(xp),

                        trabalhos:
                            Number(
                                dadosTrabalho.trabalhos || 0
                            )

                    };

                })
                .filter(
                    jogador =>
                        jogador.fortuna > 0 ||
                        jogador.trabalhos > 0
                )
                .sort(
                    (a, b) =>
                        b.fortuna -
                        a.fortuna
                );

        // ==========================
        // RANKING VAZIO
        // ==========================

        if (ranking.length === 0) {

            return sock.sendMessage(chat, {
                text:
`🏴‍☠️ *RANKING DA GRAND LINE*

━━━━━━━━━━━━━━━━━━

😴 Ainda não existem piratas no ranking.

Comece sua aventura usando:

💰 !daily
💼 !trabalhar

🍖 Acumule berries e conquiste o topo!`
            });

        }

        // ==========================
        // TOP 10
        // ==========================

        const top10 =
            ranking.slice(0, 10);

        let texto =
`🏆 *RANKING DA GRAND LINE* 🏴‍☠️

━━━━━━━━━━━━━━━━━━

👑 *TOP 10 PIRATAS MAIS RICOS*

`;

        top10.forEach(
            (jogador, index) => {

                const posicao =
                    index + 1;

                let medalha;

                if (posicao === 1) {
                    medalha = "🥇";
                } else if (posicao === 2) {
                    medalha = "🥈";
                } else if (posicao === 3) {
                    medalha = "🥉";
                } else {
                    medalha = `🏅`;
                }

                const nome =
                    nomeJogador(
                        jogador.id
                    );

                texto +=
`${medalha} *#${posicao}* @${nome}

💰 ${formatar(jogador.fortuna)} berries
⭐ Nível ${jogador.nivel}
⚒️ ${jogador.trabalhos} trabalhos

`;

            }
        );

        texto +=
`━━━━━━━━━━━━━━━━━━

📊 Total de piratas:
*${ranking.length}*

`;

        // ==========================
        // POSIÇÃO DO JOGADOR
        // ==========================

        const posicaoAtual =
            ranking.findIndex(
                jogador =>
                    jogador.id ===
                    jogadorAtual
            ) + 1;

        const dadosAtual =
            ranking.find(
                jogador =>
                    jogador.id ===
                    jogadorAtual
            );

        if (posicaoAtual > 0) {

            texto +=
`👤 *SEU RANKING*

🏆 Posição:
*#${posicaoAtual}*

💰 Fortuna:
*${formatar(dadosAtual.fortuna)} berries*

⭐ Nível:
*${dadosAtual.nivel}*

⚒️ Trabalhos:
*${dadosAtual.trabalhos}*

`;

        } else {

            texto +=
`👤 *VOCÊ AINDA NÃO ESTÁ NO RANKING*

Use:

💰 !daily
💼 !trabalhar

🍖 Comece a juntar sua fortuna!

`;

        }

        texto +=
`━━━━━━━━━━━━━━━━━━

🔥 *Quem chegar ao topo será o verdadeiro Rei dos Piratas!* 🏴‍☠️`;

        // ==========================
        // MENÇÕES
        // ==========================

        const mentions =
            top10
                .map(
                    jogador =>
                        jogador.id
                );

        if (
            posicaoAtual > 0 &&
            !mentions.includes(jogadorAtual)
        ) {

            mentions.push(
                jogadorAtual
            );

        }

        return sock.sendMessage(chat, {
            text,
            mentions
        });

    }

};
