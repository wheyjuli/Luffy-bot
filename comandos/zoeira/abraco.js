module.exports = {
nome:"abraco",
comando:"abraco",

executar: async(sock,msg)=>{

let id = msg.key.remoteJid;

let mencionado = 
msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];


let alvo = mencionado || msg.key.participant || id;


await sock.sendMessage(id,{
image:{
url:"./imagens/abraco.jpg"
},
caption:`🤗 *ABRAÇO DA TRIPULAÇÃO* 🏴‍☠️🍖

@${alvo.split("@")[0]} recebeu um abraço da tripulação do Luffy Bot!

❤️ A tripulação está unida!`,
mentions:[alvo]
});


}

};
