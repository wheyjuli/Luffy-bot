// 🏴‍☠️ LUFFY BOT
// 🎁 DAILY — Recompensa diária melhorada

const fs = require("fs");

const arquivo = "./database/dinheiro.json";
const diario = "./database/daily.json";

function carregarArquivo(caminho, padrao = {}) {
    try {
        if (!fs.existsSync(caminho)) {
            fs.writeFileSync(
                caminho,
                JSON.stringify(padrao, null, 2)
            );

            return padrao;
        }

        const conteudo =
            fs.readFileSync(caminho, "utf8").trim();

        if (!conteudo) return padrao;

        return JSON.parse(conteudo);

    } catch (erro) {

        console.error(
            `❌ Erro lendo ${caminho}:`,
            erro
        );

        return padrao;
    }
}

function salvarArquivo(caminho, dados) {

    fs.writeFileSync(
        caminho,
        JSON.stringify(dados, null, 2)
    );

}

function formatarNumero(numero) {
    return Number(numero).toLocaleString("pt-BR");
}

function obterId(msg) {

    return (
        msg.key.participant ||
        msg.key.remoteJid
    );

}

function diasEntre(data1, data2) {

    const d1 = new Date(data1);
    const d2 = new Date(data2);

    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    return Math.floor(
        Math.abs(d2 - d1) /
        (1000 * 60 * 60 * 24)
    );

}

module.exports = {

    nome: "daily",
    comando: "daily",

    executar: async (sock, msg) => {

        const id =
            obterId(msg);

        const chat =
            msg.key.remoteJid;

        const dados =
            carregarArquivo(arquivo);

        const diarios =
            carregarArquivo(diario);

        const hoje =
            new Date().toLocaleDateString(
                "pt-BR"
            );

        // ==========================
        // DADOS DO USUÁRIO
        // ==========================

        if (!diarios[id]) {

            diarios[id] = {
                ultimo: null,
                sequencia: 0,
                total: 0
            };

        }

        const info =
            diarios[id];

        // ==========================
        // JÁ PEGOU HOJE
        // ==========================

        if (info.ultimo === hoje) {

            return sock.sendMessage(chat, {
                text:
`⏳ *RECOMPENSA JÁ RESGATADA!*

🏴‍☠️ Você já pegou seu prêmio de hoje.

🔥 Sequência atual:
*${info.sequencia} dias*

🎁 Volte amanhã para continuar sua sequência!

🍖 Não abandone a tripulação!`
            });

        }

        // ==========================
        // SEQUÊNCIA
        // ==========================

        if (
            info.ultimo &&
            diasEntre(info.ultimo, hoje) === 1
        ) {

            info.sequencia++;

        } else {

            info.sequencia = 1;

        }

        // ==========================
        // PRÊMIO BASE
        // ==========================

        const premioBase =
            Math.floor(
                Math.random() * 401
            ) + 300;

        // 300 até 700

        // ==========================
        // BÔNUS DE SEQUÊNCIA
        // ==========================

        const bonus =
            Math.min(
                info.sequencia * 50,
                1000
            );

        const premio =
            premioBase + bonus;

        // ==========================
        // SALDO
        // ==========================

        if (
            typeof dados[id] !== "number"
        ) {

            dados[id] = 0;

        }

        dados[id] += premio;

        // ==========================
        // ESTATÍSTICAS
        // ==========================

        info.ultimo = hoje;

        info.total =
            (info.total || 0) + premio;

        // ==========================
        // SALVAR
        // ==========================

        salvarArquivo(
            arquivo,
            dados
        );

        salvarArquivo(
            diario,
            diarios
        );

        // ==========================
        // MENSAGEM
        // ==========================

        let titulo =
            "🎁 *RECOMPENSA DIÁRIA*";

        if (info.sequencia >= 7) {
            titulo =
                "🔥 *SEQUÊNCIA INSANA!*";
        } else if (info.sequencia >= 3) {
            titulo =
                "⚡ *SEQUÊNCIA ATIVADA!*";
        }

        await sock.sendMessage(chat, {
            text:
`${titulo} 🏴‍☠️

━━━━━━━━━━━━━━━━━━

💰 Prêmio base:
*${formatarNumero(premioBase)} berries*

🔥 Bônus da sequência:
*+${formatarNumero(bonus)} berries*

🎁 Total recebido:
*${formatarNumero(premio)} berries*

━━━━━━━━━━━━━━━━━━

💵 Seu saldo:
*${formatarNumero(dados[id])} berries*

🔥 Sequência:
*${info.sequencia} dia(s)*

💎 Total ganho em daily:
*${formatarNumero(info.total)} berries*

━━━━━━━━━━━━━━━━━━

${info.sequencia >= 7
    ? "👑 Você está virando um verdadeiro Yonkou!"
    : info.sequencia >= 3
        ? "🔥 Continue assim, nakama!"
        : "🍖 Volte amanhã para aumentar sua sequência!"}

🏴‍☠️ *A Grand Line recompensa quem não desiste!*`
        });

    }

};
