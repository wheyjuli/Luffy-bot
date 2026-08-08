const fs = require("fs");

module.exports = {
    comando: "lfala",

    executar: async (sock, msg, args) => {

        let estado = args[0];

        if (estado !== "on" && estado !== "off") {
            return sock.sendMessage(msg.key.remoteJid, {
                text: "👒 Use:\n!lfala on\n!lfala off"
            });
        }

        fs.writeFileSync(
            "./luffyfala_config.json",
            JSON.stringify({
                ativo: estado === "on"
            }, null, 2)
        );

        await sock.sendMessage(msg.key.remoteJid, {
            text: estado === "on"
            ? "🍖 Luffy Fala ligado!"
            : "🏴‍☠️ Luffy Fala desligado!"
        });
    }
};
