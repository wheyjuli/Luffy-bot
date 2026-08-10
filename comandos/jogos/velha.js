// ============================================
// 🏴‍☠️ JOGO DA VELHA - MULTIPLAYER
// ============================================

const desafios = {};
const partidas = {};

const VITORIAS = [
    [0, 1, 2],
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

module.exports = {
    nome: "velha",
    comando: "velha",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;
        const remetente = msg.key.participant || id;

        const texto =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        const textoLimpo = texto.trim();

        const args = textoLimpo
            .replace(/^!velha/i, "")
            .trim();

        // ========================================
        // SAIR DA PARTIDA
        // ========================================

        if (
            args.toLowerCase() === "sair" ||
            args.toLowerCase() === "cancelar"
        ) {

            const partida = partidas[id];

            if (!partida) {

                return sock.sendMessage(id, {
                    text:
`⚠️ *NÃO HÁ PARTIDA ATIVA!*

Use:
*!velha @pessoa*

para desafiar alguém.`
                });
            }

            if (
                remetente !== partida.jogador1 &&
                remetente !== partida.jogador2
            ) {
                return;
            }

            const adversario =
                remetente === partida.jogador1
                    ? partida.jogador2
                    : partida.jogador1;

            delete partidas[id];

            return sock.sendMessage(id, {
                text:
`🚪 *PARTIDA ENCERRADA!*

🏳️ O jogador abandonou a partida.

🏆 Vitória por desistência para o adversário!`
            });
        }


        // ========================================
        // SE JÁ ESTÁ EM UMA PARTIDA
        // ========================================

        if (partidas[id]) {

            const partida = partidas[id];

            const pos = Number(args) - 1;

            if (
                remetente !== partida.jogador1 &&
                remetente !== partida.jogador2
            ) {
                return;
            }

            // Verificar se é a vez
            if (remetente !== partida.vez) {

                return sock.sendMessage(id, {
                    text:
`⏳ *NÃO É SUA VEZ!*

Aguarde o outro jogador.`
                });
            }

            // Verificar posição
            if (
                !Number.isInteger(pos) ||
                pos < 0 ||
                pos > 8
            ) {

                return sock.sendMessage(id, {
                    text:
`❌ *POSIÇÃO INVÁLIDA!*

Escolha uma posição de *1 a 9*.

Exemplo:
*!velha 5*`
                });
            }

            // Casa ocupada
            if (
                partida.tabuleiro[pos] === "❌" ||
                partida.tabuleiro[pos] === "⭕"
            ) {

                return sock.sendMessage(id, {
                    text:
`🚫 *CASA OCUPADA!*

Escolha outra posição.`
                });
            }

            // ====================================
            // FAZER JOGADA
            // ====================================

            const simbolo =
                remetente === partida.jogador1
                    ? "❌"
                    : "⭕";

            partida.tabuleiro[pos] = simbolo;

            // ====================================
            // VERIFICAR VITÓRIA
            // ====================================

            if (venceu(partida.tabuleiro, simbolo)) {

                const vencedor = remetente;

                const perdedor =
                    remetente === partida.jogador1
                        ? partida.jogador2
                        : partida.jogador1;

                const nomeVencedor =
                    vencedor.split("@")[0];

                delete partidas[id];

                return sock.sendMessage(id, {
                    text:
`🏆 *VITÓRIA!*

${tabuleiro(partida.tabuleiro)}

🎉 @${nomeVencedor} venceu a partida!

👑 Parabéns ao vencedor!

🔄 Para jogar novamente:
*!velha @pessoa*`,
                    mentions: [vencedor, perdedor]
                });
            }


            // ====================================
            // EMPATE
            // ====================================

            if (!temCasaLivre(partida.tabuleiro)) {

                delete partidas[id];

                return sock.sendMessage(id, {
                    text:
`🤝 *EMPATE!*

${tabuleiro(partida.tabuleiro)}

⚔️ Ninguém conseguiu vencer!

🔄 Para jogar novamente:
*!velha @pessoa*`
                });
            }


            // ====================================
            // TROCAR VEZ
            // ====================================

            partida.vez =
                partida.vez === partida.jogador1
                    ? partida.jogador2
                    : partida.jogador1;

            const proximo =
                partida.vez;

            const simboloProximo =
                proximo === partida.jogador1
                    ? "❌"
                    : "⭕";

            return sock.sendMessage(id, {
                text:
`🏴‍☠️ *JOGO DA VELHA*
━━━━━━━━━━━━━━━━

${tabuleiro(partida.tabuleiro)}

🎯 *VEZ DO JOGADOR*

${simboloProximo} @${proximo.split("@")[0]}

Digite:
*!velha 1* até *!velha 9*

🚪 Para sair:
*!velha sair*`,
                mentions: [proximo]
            });
        }


        // ========================================
        // ACEITAR DESAFIO
        // ========================================

        if (
            args.toLowerCase() === "aceitar"
        ) {

            const desafio = desafios[id];

            if (!desafio) {

                return sock.sendMessage(id, {
                    text:
`⚠️ *NÃO HÁ DESAFIO PENDENTE.*

Alguém precisa enviar:
*!velha @pessoa*`
                });
            }

            if (desafio.desafiado !== remetente) {

                return sock.sendMessage(id, {
                    text:
`🚫 *ESSE DESAFIO NÃO É PARA VOCÊ!*`
                });
            }

            const jogador1 = desafio.desafiante;
            const jogador2 = desafio.desafiado;

            delete desafios[id];

            partidas[id] = {
                jogador1,
                jogador2,
                vez: jogador1,

                tabuleiro: [
                    "1", "2", "3",
                    "4", "5", "6",
                    "7", "8", "9"
                ]
            };

            return sock.sendMessage(id, {
                text:
`🔥 *DESAFIO ACEITO!*
━━━━━━━━━━━━━━━━

❌ @${jogador1.split("@")[0]}
⭕ @${jogador2.split("@")[0]}

${tabuleiro(partidas[id].tabuleiro)}

🎯 *VEZ DO JOGADOR*

❌ @${jogador1.split("@")[0]}

Digite:
*!velha 1* até *!velha 9*

🚪 Para sair:
*!velha sair*`,
                mentions: [jogador1, jogador2]
            });
        }


        // ========================================
        // RECUSAR DESAFIO
        // ========================================

        if (
            args.toLowerCase() === "recusar"
        ) {

            const desafio = desafios[id];

            if (!desafio) {

                return sock.sendMessage(id, {
                    text:
`⚠️ *NÃO HÁ DESAFIO PENDENTE.*`
                });
            }

            if (desafio.desafiado !== remetente) {
                return;
            }

            delete desafios[id];

            return sock.sendMessage(id, {
                text:
`❌ *DESAFIO RECUSADO.*

O desafio foi cancelado.`
            });
        }


        // ========================================
        // CRIAR DESAFIO
        // ========================================

        if (!args) {

            return sock.sendMessage(id, {
                text:
`🏴‍☠️ *JOGO DA VELHA*
━━━━━━━━━━━━━━━━

🎮 *MODO MULTIPLAYER*

Desafie uma pessoa do grupo:

*!velha @pessoa*

Depois que a pessoa receber o desafio:

✅ *!velha aceitar*

❌ *!velha recusar*

Durante a partida:

*!velha 1* até *!velha 9*

🚪 *!velha sair*`
            });
        }


        // ========================================
        // PEGAR MENÇÃO
        // ========================================

        const mencoes =
            msg.message?.extendedTextMessage
                ?.contextInfo
                ?.mentionedJid || [];

        if (mencoes.length === 0) {

            return sock.sendMessage(id, {
                text:
`⚠️ *VOCÊ PRECISA MENCIONAR UM JOGADOR!*

Exemplo:

*!velha @pessoa*`
            });
        }

        const desafiado = mencoes[0];

        // Não pode desafiar a si mesmo
        if (desafiado === remetente) {

            return sock.sendMessage(id, {
                text:
`😂 *VOCÊ NÃO PODE SE DESAFIAR!*

Escolha outra pessoa.`
            });
        }


        // ========================================
        // JÁ EXISTE DESAFIO
        // ========================================

        if (desafios[id]) {

            return sock.sendMessage(id, {
                text:
`⚠️ *JÁ EXISTE UM DESAFIO PENDENTE!*

Aguarde a resposta do jogador.`
            });
        }


        // ========================================
        // JÁ ESTÁ JOGANDO
        // ========================================

        if (partidas[id]) {

            return sock.sendMessage(id, {
                text:
`⚠️ *JÁ EXISTE UMA PARTIDA EM ANDAMENTO!*

Termine a partida antes de começar outra.`
            });
        }


        // ========================================
        // SALVAR DESAFIO
        // ========================================

        desafios[id] = {
            desafiante: remetente,
            desafiado
        };


        // ========================================
        // ENVIAR DESAFIO
        // ========================================

        return sock.sendMessage(id, {
            text:
`⚔️ *NOVO DESAFIO!*
━━━━━━━━━━━━━━━━

🏴‍☠️ @${remetente.split("@")[0]}

desafiou:

🎯 @${desafiado.split("@")[0]}

❌ *Para aceitar:*
*!velha aceitar*

⭕ *Para recusar:*
*!velha recusar*

⏳ Aguardando resposta...`,
            mentions: [
                remetente,
                desafiado
            ]
        });
    }
};


// ============================================
// TABULEIRO
// ============================================

function tabuleiro(t) {

    const mostrar = (valor) => {

        if (valor === "❌") return "❌";
        if (valor === "⭕") return "⭕";

        return `${valor}️⃣`;
    };

    return `${mostrar(t[0])} ${mostrar(t[1])} ${mostrar(t[2])}
${mostrar(t[3])} ${mostrar(t[4])} ${mostrar(t[5])}
${mostrar(t[6])} ${mostrar(t[7])} ${mostrar(t[8])}`;
}


// ============================================
// VERIFICAR VITÓRIA
// ============================================

function venceu(tab, simbolo) {

    return VITORIAS.some(linha =>
        linha.every(posicao =>
            tab[posicao] === simbolo
        )
    );
}


// ============================================
// VERIFICAR CASAS LIVRES
// ============================================

function temCasaLivre(tab) {

    return tab.some(valor =>
        valor !== "❌" &&
        valor !== "⭕"
    );
}
