module.exports = {
nome:"antilink",
comando:"antilink",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:"🛡️ Sistema anti-link da tripulação ativado 🏴‍☠️"
});
}
};
