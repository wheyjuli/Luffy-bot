module.exports = {
nome:"gado",
comando:"gado",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/gado.jpg"},
caption:"🐄 Gado da Grand Line 😂"
});
}
};
