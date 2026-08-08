module.exports = {
nome:"depositar",
comando:"depositar",

executar: async(sock,msg)=>{

await sock.sendMessage(msg.key.remoteJid,{
text:"🏦 Depósito realizado!\n💰 Suas berries estão guardadas."
});

}
};
