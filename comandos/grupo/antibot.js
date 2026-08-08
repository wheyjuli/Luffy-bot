module.exports = {
    nome:"antibot",
    comando:"antibot",

    executar: async(sock,msg)=>{

        let id = msg.key.remoteJid;

        if(!id.endsWith("@g.us")) return;

        let texto = msg.message?.conversation || "";

        if(texto.toLowerCase().includes("bot")){

            await sock.sendMessage(id,{
                text:"🤖 Mensagem de bot detectada."
            });

        }

    }
};
