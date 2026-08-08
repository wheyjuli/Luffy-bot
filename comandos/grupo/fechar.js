module.exports = {
nome:"fechar",
comando:"fechar",

executar: async(sock,msg)=>{
await sock.groupSettingUpdate(
msg.key.remoteJid,
"announcement"
);

await sock.sendMessage(msg.key.remoteJid,{
text:"🔒 Grupo fechado pelo Capitão Luffy 🏴‍☠️"
});
}
};
