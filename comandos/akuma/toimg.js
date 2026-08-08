const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
    nome:"toimg",
    comando:"toimg",

    executar: async(sock,msg)=>{

        try{

            let quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

            if(!quoted || !quoted.stickerMessage){
                return sock.sendMessage(msg.key.remoteJid,{
                    text:"📷 Responda uma figurinha com !toimg"
                });
            }


            let stream = await downloadContentFromMessage(
                quoted.stickerMessage,
                "sticker"
            );


            let buffer = Buffer.from([]);

            for await(const chunk of stream){
                buffer = Buffer.concat([buffer,chunk]);
            }


            fs.writeFileSync("./sticker.webp",buffer);


            exec(
                `ffmpeg -i ./sticker.webp ./imagem.png`,
                async()=>{


                    await sock.sendMessage(msg.key.remoteJid,{
                        image:{
                            url:"./imagem.png"
                        },
                        caption:"📷 Figurinha convertida em imagem 🏴‍☠️"
                    });


                    if(fs.existsSync("./sticker.webp"))
                        fs.unlinkSync("./sticker.webp");

                    if(fs.existsSync("./imagem.png"))
                        fs.unlinkSync("./imagem.png");


                }
            );


        }catch(e){

            console.log(e);

            sock.sendMessage(msg.key.remoteJid,{
                text:"❌ Erro ao converter figurinha."
            });

        }

    }
};
