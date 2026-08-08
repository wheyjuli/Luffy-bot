module.exports = {
nome:"corno",
comando:"corno",

executar: async(sock,msg)=>{
await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/corno.jpg"},
caption:"🐂 Resultado detectado pela tripulação 😂"
});
}
};
