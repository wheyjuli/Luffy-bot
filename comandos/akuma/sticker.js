const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
    nome:"sticker",
    comando:"sticker",

    executar: async(sock,msg)=>{

        try{

            let quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

            if(!quoted){
                return sock.sendMessage(msg.key.remoteJid,{
                    text:"🖼️ Responda uma imagem ou vídeo com !sticker"
                });
            }


            let media = quoted.imageMessage || quoted.videoMessage;
            let tipo = quoted.imageMessage ? "image" : "video";


            let stream = await downloadContentFromMessage(media,tipo);

            let buffer = Buffer.from([]);

            for await(const chunk of stream){
                buffer = Buffer.concat([buffer,chunk]);
            }


            fs.writeFileSync("./entrada.jpg",buffer);


            exec(
            `ffmpeg -i ./entrada.jpg -vf "scale=512:512:force_original_aspect_ratio=decrease" -c:v libwebp ./figurinha.webp`,
            async()=>{


                await sock.sendMessage(msg.key.remoteJid,{
                    sticker:{
                        url:"./figurinha.webp"
                    }
                });


                if(fs.existsSync("./entrada.jpg"))
                    fs.unlinkSync("./entrada.jpg");

                if(fs.existsSync("./figurinha.webp"))
                    fs.unlinkSync("./figurinha.webp");


            });


        }catch(e){

            console.log(e);

            sock.sendMessage(msg.key.remoteJid,{
                text:"❌ Erro ao criar figurinha."
            });

        }

    }
};
