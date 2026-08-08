module.exports = {
nome:"tapa",
comando:"tapa",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/tapa.jpg"},
caption:"👋 Tapa de pirata 😂🏴‍☠️"
});
}
};
