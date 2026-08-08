const inicioBot = Date.now();

module.exports = {
    nome: "runtime",
    comando: "runtime",

    executar: async (sock, msg) => {

        const tempo = Date.now() - inicioBot;

        const segundos = Math.floor(tempo / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);

        const texto = `
⏱️ *RUNTIME DO LUFFY BOT* 🏴‍☠️

⚓ Online há:
${horas} hora(s), ${minutos % 60} minuto(s) e ${segundos % 60} segundo(s)

🍖 Carne é combustível!
`;

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: texto
            }
        );
    }
};
