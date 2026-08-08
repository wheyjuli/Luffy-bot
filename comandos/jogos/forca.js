let jogos = {};

module.exports = {
nome:"forca",
comando:"forca",

executar: async(sock,msg)=>{

let texto = msg.message?.conversation ||
msg.message?.extendedTextMessage?.text ||
"";

let tentativa = texto.replace("!forca","").trim().toUpperCase();

let id = msg.key.remoteJid;


let boneco=[
" +---+\n |   |\n     |\n     |\n     |\n=========",
" +---+\n |   |\n O   |\n     |\n     |\n=========",
" +---+\n |   |\n O   |\n |   |\n     |\n=========",
" +---+\n |   |\n O   |\n/|   |\n     |\n=========",
" +---+\n |   |\n O   |\n/|\\  |\n     |\n=========",
" +---+\n |   |\n O   |\n/|\\  |\n/    |\n=========",
" +---+\n |   |\n O   |\n/|\\  |\n/ \\  |\n========="
];


let palavras=[
{
palavra:"LUFFY",
dica:"Capitão que quer ser o Rei dos Piratas 🍖"
},
{
palavra:"ZORO",
dica:"Espadachim que usa três espadas ⚔️"
},
{
palavra:"AKUMA",
dica:"Fruta misteriosa que dá poderes 🍎"
},
{
palavra:"ONEPIECE",
dica:"Grande tesouro deixado por Gol D. Roger 🏴‍☠️"
}
];


if(!jogos[id]){


let escolhido=palavras[Math.floor(Math.random()*palavras.length)];


jogos[id]={
palavra:escolhido.palavra,
dica:escolhido.dica,
letras:[],
erros:0
};


return sock.sendMessage(id,{
text:`🔤 *JOGO DA FORCA* 🏴‍☠️

${boneco[0]}

Palavra:

${"_ ".repeat(escolhido.palavra.length)}

💡 Dica:
${escolhido.dica}

Use:
!forca letra`
});

}



if(!tentativa){

return sock.sendMessage(id,{
text:"⚔️ Use uma letra ou palavra.\nExemplo:\n!forca a\nou\n!forca zoro"
});

}


// tentativa da palavra completa

if(tentativa.length > 1){

if(tentativa === jogos[id].palavra){

delete jogos[id];

return sock.sendMessage(id,{
text:`🎉 *VOCÊ GANHOU!* 🏴‍☠️

A palavra era:
${tentativa}`
});

}else{

jogos[id].erros++;

}

}


// tentativa de letra

else{

if(!jogos[id].palavra.includes(tentativa)){

jogos[id].erros++;

}

jogos[id].letras.push(tentativa);

}



let palavra=jogos[id].palavra;

let resultado="";


for(let letra of palavra){

if(jogos[id].letras.includes(letra)){

resultado+=letra+" ";

}else{

resultado+="_ ";

}

}



if(jogos[id].erros>=6){

let perdeu=jogos[id].palavra;

delete jogos[id];


return sock.sendMessage(id,{
text:`☠️ *VOCÊ PERDEU!* 🏴‍☠️

${boneco[6]}

A palavra era:
${perdeu}`
});

}



if(!resultado.includes("_")){

let ganhou=jogos[id].palavra;

delete jogos[id];


return sock.sendMessage(id,{
text:`🎉 *VOCÊ GANHOU!* 🏴‍☠️

Palavra:
${ganhou}`
});

}



await sock.sendMessage(id,{
text:`🔤 *FORCA* 🏴‍☠️

${boneco[jogos[id].erros]}

Palavra:

${resultado}

💡 Dica:
${jogos[id].dica}

❌ Erros:
${jogos[id].erros}/6`
});


}

};
