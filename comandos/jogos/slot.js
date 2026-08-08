module.exports = {
nome:"slot",
comando:"slot",

executar: async(sock,msg)=>{

let simbolos=["🍖","💰","⭐","🏴‍☠️"];

let jogo=[
simbolos[Math.floor(Math.random()*4)],
simbolos[Math.floor(Math.random()*4)],
simbolos[Math.floor(Math.random()*4)]
];

await sock.sendMessage(msg.key.remoteJid,{
text:`🎰 *SLOT PIRATA* 🏴‍☠️

${jogo.join(" | ")}

Boa sorte!`
});

}
};
