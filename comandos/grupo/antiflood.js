const flood = new Map();

module.exports = {
    nome:"antiflood",
    comando:"antiflood",

    executar: async(sock,msg)=>{

        const id = msg.key.remoteJid;
        const user = msg.key.participant || msg.key.remoteJid;

        if(!id.endsWith("@g.us")) return;


        let agora = Date.now();

        if(!flood.has(user)){
            flood.set(user,[]);
        }

        let mensagens = flood.get(user);

        mensagens.push(agora);


        // remove mensagens antigas (10 segundos)
        flood.set(
            user,
            mensagens.filter(t => agora - t < 10000)
        );


        // se mandar 5 mensagens em 10 segundos
        if(flood.get(user).length >= 5){

            await sock.sendMessage(id,{
                text:`🌊 *ANTI-FLOOD ATIVADO* ⚓

👤 Usuário:
@${user.split("@")[0]}

⚠️ Pare de enviar muitas mensagens seguidas!`,
                mentions:[user]
            });


            flood.delete(user);
        }

    }
};
