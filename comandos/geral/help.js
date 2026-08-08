module.exports = {
    nome: "help",
    comando: "help",

    executar: async (sock, msg) => {

        const texto = `
📖 *AJUDA DO LUFFY BOT* 🏴‍☠️

Comandos principais:

☠️ !menu
📖 !help
🏓 !ping
⏱️ !runtime
🚀 !speed
📜 !info
👑 !owner

🍖 Use !menu para ver todos os comandos.
`;

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: texto
            }
        );
    }
};
