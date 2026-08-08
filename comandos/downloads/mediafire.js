module.exports = {
nome:"mediafire",
comando:"mediafire",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:`📦 *MEDIAFIRE* 🏴‍☠️

Use:
!mediafire link

🍖 Baú aberto!`
});
}
};
