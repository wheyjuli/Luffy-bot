const { isDono } = require("../../dono");

module.exports = {
    nome:"eval",
    comando:"eval",

    executar: async(sock,msg,args)=>{

        if(!isDono(msg)){

            return sock.sendMessage(msg.key.remoteJid,{
                text:"⛔ Apenas a criadora pode usar esse comando! 👑"
            });

        }


        try{

            let codigo = args.join(" ");

            let resultado = await eval(codigo);


            await sock.sendMessage(msg.key.remoteJid,{
                text:`⚙️ *EVAL LUFFY BOT* 🏴‍☠️

✅ Resultado:

${resultado}`
            });


        }catch(e){

            await sock.sendMessage(msg.key.remoteJid,{
                text:`❌ Erro:

${e}`
            });

        }

    }
};
