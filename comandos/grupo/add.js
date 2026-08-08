module.exports = {
nome:"add",
comando:"add",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:"➕ Use: !add número\n⚓ Adicionando pirata à tripulação!"
});
}
};
