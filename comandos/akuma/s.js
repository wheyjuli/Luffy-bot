const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { writeFileSync, existsSync, unlinkSync } = require("fs");
const { exec } = require("child_process");

module.exports = {
    nome:"s",
    comando:"s",

    executar: async(sock,msg)=>{

        try {

            let quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

            if(!quoted){
                return sock.sendMessage(msg.key.remoteJid,{
                    text:"🖼️ Responda uma imagem ou vídeo com !s"
                });
            }


            let tipo = quoted.imageMessage ? "image" : "video";

            let media = quoted.imageMessage || quoted.videoMessage;


            let stream = await downloadContentFromMessage(
                media,
                tipo
            );


            let buffer = Buffer.from([]);

            for await (const chunk of stream){
                buffer = Buffer.concat([buffer,chunk]);
            }


            let entrada = "./sticker.webp";

            writeFileSync(entrada,buffer);


            await new Promise((resolve)=>{

                exec(
                `ffmpeg -i ${entrada} -vf "scale=512:512:force_original_aspect_ratio=decrease" -c:v libwebp -loop 0 sticker.webp`,
                ()=>{
                    resolve();
                });

            });


            await sock.sendMessage(msg.key.remoteJid,{
                sticker:{
                    url:"./sticker.webp"
                }
            });


            if(existsSync("./sticker.webp")){
                unlinkSync("./sticker.webp");
            }


        } catch(e){

            console.log(e);

            await sock.sendMessage(msg.key.remoteJid,{
                text:"❌ Erro ao criar figurinha."
            });

        }

    }
};
