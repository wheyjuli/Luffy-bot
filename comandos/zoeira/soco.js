module.exports = {
nome:"soco",
comando:"soco",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/soco.jpg"},
caption:"👊 Golpe da Grand Line! 😂"
});
}
};
