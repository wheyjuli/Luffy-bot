const { isDono } = require("../../dono");

module.exports = {
    nome:"restart",
    comando:"restart",

    executar: async(sock,msg)=>{

        if(!isDono(msg)){

            return sock.sendMessage(msg.key.remoteJid,{
                text:"⛔ Apenas a criadora pode usar esse comando! 👑"
            });

        }


        await sock.sendMessage(msg.key.remoteJid,{
            text:`🔄 *REINICIANDO LUFFY BOT* 🏴‍☠️

⚙️ Atualizando sistema...
✅ Comandos recarregados
✅ Conexão reiniciada

🍖 Voltando para a Grand Line!`
        });


        setTimeout(()=>{

            process.exit();

        },2000);


    }
};
