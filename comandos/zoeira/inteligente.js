module.exports = {
nome:"inteligente",
comando:"inteligente",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/inteligente.jpg"},
caption:"🧠 Mente de pirata genial!"
});
}
};
