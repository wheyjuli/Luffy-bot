const { exec } = require("child_process");
const fs = require("fs");

module.exports = {
    nome:"attp",
    comando:"attp",

    executar: async(sock,msg)=>{

        let texto = msg.message?.conversation ||
                    msg.message?.extendedTextMessage?.text ||
                    "";

        let frase = texto.replace("!attp","").trim();


        if(!frase){
            return sock.sendMessage(msg.key.remoteJid,{
                text:"🎨 Use:\n!attp seu texto"
            });
        }


        let arquivo="./attp.png";


        exec(
        `convert -size 512x512 xc:purple -gravity center -fill white -pointsize 50 -annotate 0 "${frase}" ${arquivo}`,
        async(erro)=>{


            if(erro){
                return sock.sendMessage(msg.key.remoteJid,{
                    text:"❌ Erro ao criar ATTP."
                });
            }


            await sock.sendMessage(msg.key.remoteJid,{
                image:{
                    url:arquivo
                },
                caption:"🎨 ATTP criado pelo Luffy Bot 🏴‍☠️"
            });


            fs.unlinkSync(arquivo);

        });

    }
};
