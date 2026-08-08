module.exports = {
nome:"casar",
comando:"casar",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/casar.jpg"},
caption:"💍 Casamento na Grand Line! 🏴‍☠️\n\nQue viva a tripulação 😂"
});
}
};
