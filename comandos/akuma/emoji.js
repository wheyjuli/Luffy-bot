module.exports = {
nome:"emoji",
comando:"emoji",

executar: async(sock,msg)=>{

await sock.sendMessage(msg.key.remoteJid,{
text:"😀 Emojis da tripulação ativados 🍖"
});

}
};
