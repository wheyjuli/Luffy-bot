module.exports = {
nome:"ytmp4",
comando:"ytmp4",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:`🎥 *YOUTUBE MP4* 🏴‍☠️

Use:
!ytmp4 link do vídeo

⚓ Tesouro em vídeo!`
});
}
};
