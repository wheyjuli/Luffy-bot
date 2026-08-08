module.exports = {
nome:"lindo",
comando:"lindo",

executar: async(sock,msg)=>{

let porcentagem = Math.floor(Math.random()*101);

await sock.sendMessage(msg.key.remoteJid,{
image:{url:"./imagens/lindo.jpg"},
caption:`✨ *TESTE DE BELEZA* ✨

😍 Você é ${porcentagem}% lindo(a)!

🏴‍☠️ Luffy Bot`
});

}
};
