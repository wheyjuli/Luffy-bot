module.exports = {
nome:"feio",
comando:"feio",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/feio.jpg"},
caption:"🙈 Resultado da zoeira 😂\n🏴‍☠️ Luffy Bot"
});
}
};
