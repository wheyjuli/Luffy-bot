const { isDono } = require("../../dono");
const config = require("../../config");

module.exports = {
    nome:"setprefix",
    comando:"setprefix",

    executar: async(sock,msg,args)=>{

        if(!isDono(msg)){

            return sock.sendMessage(msg.key.remoteJid,{
                text:"⛔ Apenas a criadora pode usar esse comando! 👑"
            });

        }


        let novo = args[0];


        if(!novo){

            return sock.sendMessage(msg.key.remoteJid,{
                text:`⚙️ *ALTERAR PREFIXO* 🏴‍☠️

Use:
!setprefix novoPrefixo

Exemplo:
!setprefix .`
            });

        }


        config.prefixo = novo;


        await sock.sendMessage(msg.key.remoteJid,{
            text:`✅ *PREFIXO ALTERADO* 🏴‍☠️

Novo prefixo:
${novo}

🍖 Luffy Bot atualizado!`
        });

    }
};
