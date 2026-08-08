module.exports = {
nome:"perfil",
comando:"perfil",

executar: async(sock,msg)=>{

await sock.sendMessage(msg.key.remoteJid,{
text:`👤 *PERFIL PIRATA* 🏴‍☠️

👒 Nome: Pirata da Grand Line
💰 Berries: 0
⭐ Nível: 1

🍖 Continue sua aventura!`
});

}
};
