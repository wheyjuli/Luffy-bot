module.exports = {
nome:"divorcio",
comando:"divorcio",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/divorcio.jpg"},
caption:"💔 Divórcio confirmado pela tripulação 😂"
});
}
};
