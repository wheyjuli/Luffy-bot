module.exports = {
    nome:"gay",
    comando:"gay",

    executar: async(sock,msg)=>{

        let porcentagem = Math.floor(Math.random()*101);

        await sock.sendMessage(msg.key.remoteJid,{
            image:{url:"./imagens/gay.png"},
            caption:`🌈 *TESTE DE GAY DO LUFFY BOT* 🏴‍☠️

😂 Resultado:
🌈 Você é ${porcentagem}% gay

🍖 Brincadeira da tripulação!`
        });

    }
};
