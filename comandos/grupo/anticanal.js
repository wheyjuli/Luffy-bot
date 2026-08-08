module.exports = {
    nome:"anticanal",
    comando:"anticanal",

    executar: async(sock,msg)=>{

        const id = msg.key.remoteJid;

        if(!id.endsWith("@g.us")) return;


        let texto = msg.message?.conversation ||
                    msg.message?.extendedTextMessage?.text ||
                    "";


        let bloqueados = [
            "whatsapp.com/channel",
            "whatsapp.com/channel/",
            "wa.me/channel"
        ];


        let achou = bloqueados.some(link =>
            texto.includes(link)
        );


        if(achou){

            await sock.sendMessage(id,{
                delete: msg.key
            });


            await sock.sendMessage(id,{
                text:`🚫 *ANTI CANAL ATIVADO* ⚓

📢 Divulgação de canal não permitida.

🏴‍☠️ Luffy Bot protegendo a tripulação!`
            });

        }

    }
};
