module.exports = {
nome:"ship",
comando:"ship",

executar: async(sock,msg)=>{

let id = msg.key.remoteJid;

let usuario = msg.key.participant || id;


let participantes = [];

if(msg.key.remoteJid.endsWith("@g.us")){

let grupo = await sock.groupMetadata(id);

participantes = grupo.participants
.map(p=>p.id)
.filter(p=>p !== usuario);

}


let parceiro = participantes.length > 0 
? participantes[Math.floor(Math.random()*participantes.length)]
: usuario;


let porcentagem = Math.floor(Math.random()*101);


let frase="";

if(porcentagem >= 90){

frase="🔥 Amor lendário da Grand Line!";

}
else if(porcentagem >= 70){

frase="💖 Grande chance de virar casal pirata!";

}
else if(porcentagem >= 40){

frase="🍖 Uma amizade com potencial...";

}
else{

frase="😂 Melhor continuar como companheiros de tripulação!";

}



await sock.sendMessage(id,{
text:`💘 *SHIP DA GRAND LINE* 🏴‍☠️

❤️ Casal escolhido:

👤 @${usuario.split("@")[0]}
💞 @${parceiro.split("@")[0]}

💖 Compatibilidade:
${porcentagem}%

${frase}

🍖 Que a aventura comece!`,
mentions:[
usuario,
parceiro
]
});


}

};
