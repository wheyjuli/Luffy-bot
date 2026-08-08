const { isDono } = require("../../dono");

module.exports = {
    nome:"shutdown",
    comando:"shutdown",

    executar: async(sock,msg)=>{

        if(!isDono(msg)){

            return sock.sendMessage(msg.key.remoteJid,{
                text:"⛔ Apenas a criadora pode usar esse comando! 👑"
            });

        }


        await sock.sendMessage(msg.key.remoteJid,{
            text:`🛑 *LUFFY BOT DESLIGANDO* 🏴‍☠️

⚙️ Encerrando sistema...
✅ Sessão salva
✅ Dados protegidos

👑 Comando executado pela criadora

🍖 Até a próxima aventura!`
        });


        setTimeout(()=>{

            process.exit();

        },2000);


    }
};
