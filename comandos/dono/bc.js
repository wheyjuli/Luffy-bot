const { isDono } = require("../../dono");

module.exports = {
    nome:"bc",
    comando:"bc",

    executar: async(sock,msg,args)=>{

        if(!isDono(msg)){

            return sock.sendMessage(msg.key.remoteJid,{
                text:"⛔ Apenas a criadora pode usar esse comando! 👑"
            });

        }


        let mensagem = args.join(" ");

        if(!mensagem){

            return sock.sendMessage(msg.key.remoteJid,{
                text:`📢 *BROADCAST LUFFY BOT* 🏴‍☠️

Use:
!bc mensagem`
            });

        }


        await sock.sendMessage(msg.key.remoteJid,{
            text:`📢 *AVISO DA TRIPULAÇÃO* 🏴‍☠️

${mensagem}

🍖 Luffy Bot`
        });

    }
};
