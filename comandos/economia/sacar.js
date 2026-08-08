module.exports = {
nome:"sacar",
comando:"sacar",

executar: async(sock,msg)=>{

await sock.sendMessage(msg.key.remoteJid,{
text:"💸 Saque realizado!\n💰 Aproveite suas berries."
});

}
};
