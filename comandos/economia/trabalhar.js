// 🏴‍☠️ LUFFY BOT
// 💼 SISTEMA DE TRABALHO — versão melhorada

const fs = require("fs");

const arquivo = "./database/dinheiro.json";
const xpArquivo = "./database/trabalho.json";

const cooldown = 30 * 1000;

const trabalhos = [
    {
        nome: "🍖 Cozinheiro do Thousand Sunny",
        minimo: 100,
        maximo: 350
    },
    {
        nome: "⚔️ Caçador de Piratas",
        minimo: 150,
        maximo: 500
    },
    {
        nome: "🗺️ Navegador da Grand Line",
        minimo: 120,
        maximo: 400
    },
    {
        nome: "🚢 Trabalhador do porto",
        minimo: 80,
        maximo: 280
    },
    {
        nome: "💰 Caçador de tesouros",
        minimo: 200,
        maximo: 700
    },
    {
        nome: "🎯 Atirador da tripulação",
        minimo: 130,
        maximo: 450
    },
    {
        nome: "🔧 Engenheiro do Sunny",
        minimo: 180,
        maximo: 550
    },
    {
        nome: "🏴‍☠️ Membro da tripulação",
        minimo: 100,
        maximo: 300
    },
    {
        nome: "🧭 Explorador da Grand Line",
        minimo: 170,
        maximo: 600
    },
    {
        nome: "⚓ Marinheiro",
        minimo: 90,
        maximo: 320
    }
];

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

function salvar(caminho, dados) {

    fs.writeFileSync(
        caminho,
        JSON.stringify(dados, null, 2)
    );

}

function numero(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

function formatar(valor) {

    return Number(valor || 0)
        .toLocaleString("pt-BR");

}

function nivelPorXP(xp) {

    return Math.floor(
        Math.sqrt(xp / 100)
    ) + 1;

}

function xpParaProximoNivel(nivel) {

    return nivel * nivel * 100;

}

module.exports = {

    nome: "trabalhar",
    comando: "trabalhar",

    executar: async (sock, msg) => {

        const id =
            msg.key.participant ||
            msg.key.remoteJid;

        const chat =
            msg.key.remoteJid;

        // ==========================
        // CARREGAR DADOS
        // ==========================

        const dinheiro =
            carregar(arquivo);

        const trabalhosDados =
            carregar(xpArquivo);

        if (!trabalhosDados[id]) {

            trabalhosDados[id] = {
                xp: 0,
                trabalhos: 0,
                ganhos: 0,
                ultimo: 0
            };

        }

        const jogador =
            trabalhosDados[id];

        const agora =
            Date.now();

        // ==========================
        // COOLDOWN
        // ==========================

        const restante =
            cooldown -
            (agora - jogador.ultimo);

        if (restante > 0) {

            const segundos =
                Math.ceil(restante / 1000);

            return sock.sendMessage(chat, {
                text:
`⏳ *CALMA, PIRATA!*

Você precisa descansar antes de trabalhar novamente.

🕐 Aguarde:
*${segundos} segundos*

🏴‍☠️ Depois tente:

*!trabalhar*`
            });

        }

        // ==========================
        // ESCOLHER TRABALHO
        // ==========================

        const trabalho =
            trabalhos[
                Math.floor(
                    Math.random() *
                    trabalhos.length
                )
            ];

        const ganho =
            numero(
                trabalho.minimo,
                trabalho.maximo
            );

        const xpGanho =
            numero(15, 40);

        // ==========================
        // CHANCE DE BÔNUS
        // ==========================

        const teveBonus =
            Math.random() < 0.15;

        const bonus =
            teveBonus
                ? numero(100, 300)
                : 0;

        // ==========================
        // CHANCE DE FALHA
        // ==========================

        const falhou =
            Math.random() < 0.08;

        jogador.ultimo =
            agora;

        jogador.trabalhos++;

        if (falhou) {

            const xpFalha =
                numero(5, 15);

            jogador.xp += xpFalha;

            salvar(
                xpArquivo,
                trabalhosDados
            );

            const nivel =
                nivelPorXP(jogador.xp);

            return sock.sendMessage(chat, {
                text:
`💥 *TRABALHO DEU RUIM!* 🏴‍☠️

💼 Trabalho:
*${trabalho.nome}*

😵 Você tentou trabalhar, mas acabou se metendo em uma confusão!

💰 Ganho:
*0 berries*

⭐ XP recebido:
*+${xpFalha} XP*

📊 Nível:
*${nivel}*

━━━━━━━━━━━━━━━━━━

⏳ Tente novamente em 30 segundos.`
            });

        }

        // ==========================
        // PAGAMENTO
        // ==========================

        const total =
            ganho + bonus;

        if (
            typeof dinheiro[id] !== "number"
        ) {
            dinheiro[id] = 0;
        }

        dinheiro[id] += total;

        jogador.xp += xpGanho;
        jogador.ganhos += total;

        // ==========================
        // NÍVEL
        // ==========================

        const nivelAntes =
            nivelPorXP(
                jogador.xp - xpGanho
            );

        const nivelDepois =
            nivelPorXP(
                jogador.xp
            );

        const subiuNivel =
            nivelDepois > nivelAntes;

        // ==========================
        // SALVAR
        // ==========================

        salvar(
            arquivo,
            dinheiro
        );

        salvar(
            xpArquivo,
            trabalhosDados
        );

        // ==========================
        // BÔNUS
        // ==========================

        const mensagemBonus =
            teveBonus
                ? `\n🎁 *BÔNUS ESPECIAL!*\n+${formatar(bonus)} berries`
                : "";

        const mensagemNivel =
            subiuNivel
                ? `\n\n🎉 *VOCÊ SUBIU DE NÍVEL!*\n\n👑 Agora você é nível *${nivelDepois}*!`
                : "";

        // ==========================
        // RESULTADO
        // ==========================

        return sock.sendMessage(chat, {
            text:
`💼 *TRABALHO CONCLUÍDO!* 🏴‍☠️

━━━━━━━━━━━━━━━━━━

⚓ Trabalho:
*${trabalho.nome}*

💰 Salário:
*${formatar(ganho)} berries*
${mensagemBonus}

💵 Total recebido:
*${formatar(total)} berries*

━━━━━━━━━━━━━━━━━━

💰 Seu saldo:
*${formatar(dinheiro[id])} berries*

⭐ XP:
*+${xpGanho} XP*

📊 Nível:
*${nivelDepois}*

⚒️ Trabalhos realizados:
*${jogador.trabalhos}*

💎 Total ganho trabalhando:
*${formatar(jogador.ganhos)} berries*
${mensagemNivel}

━━━━━━━━━━━━━━━━━━

🍖 *Continue sua aventura pela Grand Line!*

⏳ Próximo trabalho em:
*30 segundos*`
        });

    }

};
