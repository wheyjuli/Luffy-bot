module.exports = {
nome:"rebaixar",
comando:"rebaixar",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
text:"⬇️ O pirata perdeu seu cargo ⚓"
});
}
};
