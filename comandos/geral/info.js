module.exports = {
    nome: "info",
    comando: "info",

    executar: async (sock, msg) => {

        const texto = `
╔══════════════════════╗
🏴‍☠️ LUFFY BOT INFO
╚══════════════════════╝

👒 Capitão: Monkey D. Luffy
👑 Criadora: Maju
⚓ Navio: Thousand Sunny
🌊 Local: Grand Line

🤖 Versão: 1.0
🔥 Status: Online
🍖 Combustível: Carne

🏴‍☠️ "Eu vou ser o Rei dos Piratas!"
`;

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: texto
            }
        );
    }
};
