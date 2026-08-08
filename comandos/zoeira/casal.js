module.exports = {
    nome: "casal",
    comando: "casal",

    executar: async (sock, msg) => {

        const porcentagem = Math.floor(Math.random() * 101);

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                image: {
                    url: "./imagens/casal.jpg"
                },
                caption: `
💕 *CASAL DO LUFFY BOT* 🏴‍☠️

❤️ Compatibilidade:
${porcentagem}%

🍖 Será que vai dar romance na Grand Line?
`
            }
        );

    }
};
