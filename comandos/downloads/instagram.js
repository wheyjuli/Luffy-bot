module.exports = {
nome:"instagram",
comando:"instagram",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:`📸 *INSTAGRAM* 🏴‍☠️

Use:
!instagram link

⚓ Tesouro encontrado!`
});
}
};
