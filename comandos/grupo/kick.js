module.exports = {
nome:"kick",
comando:"kick",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:"👢 Comando de expulsão da tripulação ativado 🏴‍☠️"
});
}
};

