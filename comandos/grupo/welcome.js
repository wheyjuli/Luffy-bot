module.exports = {
nome:"welcome",
comando:"welcome",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:"👋 Bem-vindo à tripulação do Luffy Bot 🏴‍☠️🍖"
});
}
};
