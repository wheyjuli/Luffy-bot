module.exports = {
nome:"tiktok",
comando:"tiktok",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:`📱 *TIKTOK DOWNLOADER* 🏴‍☠️

Use:
!tiktok link

🍖 Baixando aventura...`
});
}
};
