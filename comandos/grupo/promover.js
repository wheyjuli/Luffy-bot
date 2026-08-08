module.exports = {
nome:"promover",
comando:"promover",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:"⬆️ Pirata promovido a oficial da tripulação ⚓"
});
}
};
