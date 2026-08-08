module.exports = {
nome:"lesbica",
comando:"lesbica",

executar: async(sock,msg)=>{

let id = msg.key.remoteJid;

let usuario = msg.key.participant || id;

let mencionado =
msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

let alvo = mencionado || usuario;


let porcentagem = Math.floor(Math.random()*101);


await sock.sendMessage(id,{
image:{
url:"./imagens/lesbica.jpg"
},
caption:`💜 *TESTE DE LÉSBICA DO LUFFY BOT* 🏴‍☠️

😂 Resultado:
💜 @${alvo.split("@")[0]} é ${porcentagem}% lésbica

🍖 Brincadeira da tripulação!`,
mentions:[alvo]
});


}

};
