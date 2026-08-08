module.exports = {
nome:"beijo",
comando:"beijo",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/beijo.jpg"},
caption:"😘 Beijo enviado pela Grand Line 🏴‍☠️"
});
}
};
