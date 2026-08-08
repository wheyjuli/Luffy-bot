module.exports = {
nome:"bonito",
comando:"bonito",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/bonito.jpg"},
caption:"😎 Beleza aprovada pelo Luffy Bot!"
});
}
};
