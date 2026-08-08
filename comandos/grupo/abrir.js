module.exports = {
nome:"abrir",
comando:"abrir",

executar: async(sock,msg)=>{
await sock.groupSettingUpdate(
msg.key.remoteJid,
"not_announcement"
);

await sock.sendMessage(msg.key.remoteJid,{
text:"🔓 Grupo aberto novamente ⚓"
});
}
};
