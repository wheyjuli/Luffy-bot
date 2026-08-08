module.exports = {
nome:"sorte",
comando:"sorte",

executar: async(sock,msg)=>{
let sorte = Math.floor(Math.random()*100)+1;

await sock.sendMessage(msg.key.remoteJid,{
text:`🍀 *SORTE DA GRAND LINE* 🏴‍☠️

✨ Sua sorte hoje:
${sorte}%

Boa aventura, pirata!`
});
}
};
