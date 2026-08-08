module.exports = {
nome:"burro",
comando:"burro",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/burro.jpg"},
caption:"🤪 Resultado da zoeira 😂\n🏴‍☠️ Luffy Bot"
});
}
};
