module.exports = {
nome:"chance",
comando:"chance",

executar: async(sock,msg)=>{
let chance = Math.floor(Math.random()*101);

await sock.sendMessage(msg.key.remoteJid,{
text:`🎲 *CHANCE DO LUFFY BOT* 🏴‍☠️

Sua chance é:
${chance}%`
});
}
};
