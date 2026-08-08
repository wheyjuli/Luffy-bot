module.exports = {
    nome:"antistatus",
    comando:"antistatus",

    executar: async(sock,msg)=>{

        let id = msg.key.remoteJid;

        if(!id.endsWith("@g.us")) return;


        let texto = msg.message?.conversation || "";

        if(texto.includes("status")){
            
            await sock.sendMessage(id,{
                text:"📵 Evite divulgação de status no grupo."
            });

        }

    }
};
