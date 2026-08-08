module.exports = {
    nome: "caraoucoroa",
    comando: "caraoucoroa",

    executar: async (sock, msg) => {

        const resultado = Math.random() < 0.5 ? "cara" : "coroa";

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: `
🪙 *CARA OU COROA* 🏴‍☠️

Resultado:
🪙 ${resultado.toUpperCase()}

🍖 A sorte decidiu!
`
            }
        );

    }
};
