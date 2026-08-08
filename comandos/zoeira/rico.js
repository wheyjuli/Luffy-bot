module.exports = {
nome:"rico",
comando:"rico",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/rico.jpg"},
caption:"💰 Tesouro encontrado na Grand Line!"
});
}
};
