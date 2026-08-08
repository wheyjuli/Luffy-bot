module.exports = {
nome:"pobre",
comando:"pobre",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/pobre.jpg"},
caption:"🪙 Sem berries hoje 😂"
});
}
};
