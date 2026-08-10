// 🏴‍☠️ LUFFY BOT
// 💰 SALDO — versão melhorada

const fs = require("fs");

const arquivo = "./database/dinheiro.json";
const diario = "./database/daily.json";

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

module.exports = {

    nome: "saldo",
    comando: "saldo",

    executar: async (sock, msg) => {

        const id =
            msg.key.participant ||
            msg.key.remoteJid;

        const chat =
            msg.key.remoteJid;

        const dados =
            carregar(arquivo);

        const diarios =
            carregar(diario);

        const saldo =
            Number(dados[id] || 0);

        const info =
            diarios[id] || {};

        const sequencia =
            Number(info.sequencia || 0);

        const totalDaily =
            Number(info.total || 0);

        // ==========================
        // RANKING
        // ==========================

        const ranking =
            Object.entries(dados)
                .map(([usuario, dinheiro]) => ({
                    usuario,
                    dinheiro: Number(dinheiro) || 0
                }))
                .sort(
                    (a, b) =>
                        b.dinheiro - a.dinheiro
                );

        const posicao =
            ranking.findIndex(
                jogador =>
                    jogador.usuario === id
            ) + 1;

        // ==========================
        // TÍTULO
        // ==========================

        let titulo =
            "💰 *SALDO DO PIRATA*";

        if (saldo >= 1000000) {

            titulo =
                "👑 *IMPERADOR DA GRAND LINE*";

        } else if (saldo >= 500000) {

            titulo =
                "🔥 *YONKOU DA ECONOMIA*";

        } else if (saldo >= 100000) {

            titulo =
                "⚔️ *GRANDE PIRATA*";

        }

        // ==========================
        // MENSAGEM
        // ==========================

        await sock.sendMessage(chat, {
            text:
`${titulo} 🏴‍☠️

━━━━━━━━━━━━━━━━━━

💵 Seu dinheiro:

💰 *${formatar(saldo)} berries*

━━━━━━━━━━━━━━━━━━

🎁 *DAILY*

🔥 Sequência:
*${sequencia} dia(s)*

💎 Total ganho:
*${formatar(totalDaily)} berries*

━━━━━━━━━━━━━━━━━━

🏆 *RANKING*

📊 Sua posição:
*#${posicao > 0 ? posicao : "-"}*

👥 Piratas registrados:
*${ranking.length}*

━━━━━━━━━━━━━━━━━━

${saldo >= 1000000
    ? "👑 Sua fortuna já é digna de um Yonkou!"
    : saldo >= 500000
        ? "🔥 Você está dominando a economia!"
        : saldo >= 100000
            ? "⚔️ Sua tripulação está ficando rica!"
            : "🍖 Continue trabalhando para ficar rico!"}

🏴‍☠️ *A riqueza da Grand Line espera por você!*`
        });

    }

};
