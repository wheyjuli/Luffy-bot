module.exports = {
    nome:"antidocs",
    comando:"antidocs",

    executar: async(sock,msg)=>{

        let id = msg.key.remoteJid;

        if(!id.endsWith("@g.us")) return;


        if(msg.message?.documentMessage){

            await sock.sendMessage(id,{
                delete: msg.key
            });


            await sock.sendMessage(id,{
                text:"📄 Documentos bloqueados pela tripulação."
            });

        }

    }
};
