module.exports = {
nome:"cassino",
comando:"cassino",

executar: async(sock,msg)=>{

let ganho=Math.floor(Math.random()*500);

await sock.sendMessage(msg.key.remoteJid,{
text:`🎰 *CASSINO PIRATA* 🏴‍☠️

Resultado:
💰 ${ganho} berries`
});

}
};
