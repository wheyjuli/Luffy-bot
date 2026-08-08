const { exec } = require("child_process");
const fs = require("fs");

module.exports = {
    nome:"ttp",
    comando:"ttp",

    executar: async(sock,msg)=>{

        let texto = msg.message?.conversation ||
                    msg.message?.extendedTextMessage?.text ||
                    "";

        let frase = texto.replace("!ttp","").trim();


        if(!frase){
            return sock.sendMessage(msg.key.remoteJid,{
                text:"💬 Use:\n!ttp seu texto"
            });
        }


        let arquivo="./ttp.png";


        exec(
        `convert -size 512x512 xc:black -gravity center -fill white -pointsize 45 -annotate 0 "${frase}" ${arquivo}`,
        async(erro)=>{


            if(erro){
                return sock.sendMessage(msg.key.remoteJid,{
                    text:"❌ Erro ao criar TTP."
                });
            }


            await sock.sendMessage(msg.key.remoteJid,{
                image:{
                    url:arquivo
                },
                caption:"💬 TTP criado pelo Luffy Bot 🏴‍☠️"
            });


            fs.unlinkSync(arquivo);

        });

    }
};
