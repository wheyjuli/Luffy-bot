module.exports = {
nome:"trollar",
comando:"trollar",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/trollar.jpg"},
caption:"🤣 Você foi trollado pelo Luffy Bot! 🏴‍☠️"
});
}
};
