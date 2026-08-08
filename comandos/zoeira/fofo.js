module.exports = {
nome:"fofo",
comando:"fofo",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/fofo.jpg"},
caption:"🥰 Muito fofo! 🍖"
});
}
};
