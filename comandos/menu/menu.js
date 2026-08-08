const menu = require("../../menu");

module.exports = {
    nome: "menu",
    comando: "menu",

    executar: async (sock, msg) => {

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                image: { url: "./imagens/menu.jpg" },
                caption: menu
            }
        );

    }
};
