module.exports = {
nome:"spotify",
comando:"spotify",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:`🎼 *SPOTIFY* 🏴‍☠️

Use:
!spotify nome da música

🎧 Procurando tesouro...`
});
}
};
