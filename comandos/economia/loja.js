module.exports = {
nome:"loja",
comando:"loja",

executar: async(sock,msg)=>{

await sock.sendMessage(msg.key.remoteJid,{
text:`
🛒 *LOJA DA GRAND LINE* 🏴‍☠️

🍖 Carne do Luffy - 100 berries
⚔️ Espada Zoro - 500 berries
🔥 Akuma no Mi - 1000 berries

💰 Use suas berries!
`
});

}
};
