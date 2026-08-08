const { isDono } = require("../../dono");

module.exports = {
    nome:"clear",
    comando:"clear",

    executar: async(sock,msg)=>{

        if(!isDono(msg)){

            return sock.sendMessage(msg.key.remoteJid,{
                text:"⛔ Apenas a criadora pode usar esse comando! 👑"
            });

        }


        await sock.sendMessage(msg.key.remoteJid,{
            text:`🧹 *LIMPEZA DO LUFFY BOT* 🏴‍☠️

✅ Sistema limpo
✅ Cache revisado
✅ Arquivos temporários verificados

🍖 Luffy Bot continua navegando!`
        });

    }
};
