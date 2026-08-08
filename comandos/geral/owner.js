module.exports = {
    nome: "owner",
    comando: "owner",

    executar: async (sock, msg) => {

        const texto = `
╔══════════════════════╗
👑 DONA DO LUFFY BOT
╚══════════════════════╝

👑 Criadora: Maju
🏴‍☠️ Bot: Luffy Bot
⚓ Navio: Thousand Sunny
🌊 Local: Grand Line

🍖 Obrigado por usar o bot!
`;

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: texto
            }
        );
    }
};
