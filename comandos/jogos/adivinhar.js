module.exports = {
nome:"adivinhar",
comando:"adivinhar",

executar: async(sock,msg)=>{

let numero=Math.floor(Math.random()*10)+1;

await sock.sendMessage(msg.key.remoteJid,{
text:`🎯 *ADIVINHE O NÚMERO* 🏴‍☠️

Escolhi um número de 1 a 10!

Será que você acerta?`
});

}
};
