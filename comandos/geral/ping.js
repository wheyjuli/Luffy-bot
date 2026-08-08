module.exports = {
    nome: "ping",
    comando: "ping",

    executar: async (sock, msg) => {

        const inicio = Date.now();

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "🏓 Calculando velocidade..."
            }
        );

        const fim = Date.now();

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: `🏓 Pong!\n⚡ Velocidade: ${fim - inicio}ms\n🏴‍☠️ Luffy Bot online!`
            }
        );

    }
};
