module.exports = {
    nome: "capitao",
    comando: "capitao",

    executar: async (sock, msg) => {

        const texto = `
╭━━〔⚔️ MENU DO CAPITÃO〕━━⬣
┃☠️ !menu
┃📖 !help
┃🏓 !ping
┃⏱️ !runtime
┃🚀 !speed
┃📜 !info
┃👑 !owner
╰━━━━━━━━━━━━━━━━━━━━⬣

🏴‍☠️ Luffy Bot
🍖 Eu vou ser o Rei dos Piratas!
👑 Criadora: Maju
⚓ Thousand Sunny
`;

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: texto
            }
        );
    }
};
