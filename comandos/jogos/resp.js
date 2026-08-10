// 🏴‍☠️ LUFFY BOT
// ❓ Respostas do Quiz One Piece

module.exports = {
    nome: "resp",
    comando: "resp",

    executar: async (sock, msg) => {

        try {

            const texto =
                msg.message?.conversation ||
                msg.message?.extendedTextMessage?.text ||
                msg.message?.imageMessage?.caption ||
                msg.message?.videoMessage?.caption ||
                "";

            const partes = texto.trim().split(/\s+/);

            // !resp A
            const resposta = partes[1]?.trim().toUpperCase();

            const quiz = require("./quiz.js");

            if (!resposta) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text:
`❓ *RESPOSTA DO QUIZ*

Digite uma alternativa:

!resp A
!resp B
!resp C
!resp D`
                });
            }

            if (!["A", "B", "C", "D"].includes(resposta)) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text:
`❌ *RESPOSTA INVÁLIDA!*

Escolha uma das alternativas:

🅰️ !resp A
🅱️ !resp B
🅲️ !resp C
🅳️ !resp D`
                });
            }

            // Envia a resposta para o sistema do quiz
            if (typeof quiz.responder === "function") {
                await quiz.responder(sock, msg, resposta);
            }

        } catch (erro) {

            console.error("❌ Erro no comando resp:", erro);

            await sock.sendMessage(msg.key.remoteJid, {
                text:
`⚠️ *ERRO NO QUIZ!*

Não consegui processar sua resposta.

Tente novamente:
!resp A`
            });

        }

    }
};
