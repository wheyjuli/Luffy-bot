let jogos = {};

const cores = [
"🔴 Vermelho",
"🔵 Azul",
"🟢 Verde",
"🟡 Amarelo"
];

function criarBaralho(){

let baralho=[];

for(let cor of cores){

for(let i=0;i<=9;i++){

baralho.push({
cor:cor,
valor:i
});

}

}

return baralho.sort(()=>Math.random()-0.5);

}


function cartaTexto(c){

return `${c.cor} ${c.valor}`;

}



module.exports = {
nome:"uno",
comando:"uno",

executar: async(sock,msg)=>{


let id = msg.key.remoteJid;
let usuario = msg.key.participant || id;


let texto =
msg.message?.conversation ||
msg.message?.extendedTextMessage?.text ||
"";


let comando = texto.replace("!uno","").trim().toLowerCase();



if(comando==="criar"){


jogos[id]={
jogadores:[usuario],
cartas:{},
baralho:[],
mesa:null,
turno:0
};



return sock.sendMessage(id,{
text:`🃏 *UNO DA GRAND LINE* 🏴‍☠️

Partida criada!

👤 @${usuario.split("@")[0]}

Para entrar:
!uno entrar`,
mentions:[usuario]
});


}




if(comando==="entrar"){


if(!jogos[id])
return;


if(jogos[id].jogadores.length>=4)
return sock.sendMessage(id,{
text:"⚠️ Máximo 4 jogadores."
});


if(!jogos[id].jogadores.includes(usuario))
jogos[id].jogadores.push(usuario);



return sock.sendMessage(id,{
text:`🃏 Jogador entrou!

👥 ${jogos[id].jogadores.length}/4`
});


}




if(comando==="iniciar"){


let jogo=jogos[id];

if(!jogo)return;


jogo.baralho=criarBaralho();


for(let p of jogo.jogadores){

jogo.cartas[p]=[];

for(let i=0;i<7;i++){

jogo.cartas[p].push(
jogo.baralho.pop()
);

}

}


jogo.mesa=jogo.baralho.pop();



await sock.sendMessage(id,{
text:`🔥 *UNO INICIADO!* 🏴‍☠️

🎴 Carta inicial:
${cartaTexto(jogo.mesa)}

👤 Vez de:
@${jogo.jogadores[0].split("@")[0]}

Use:
!uno jogar número`,
mentions:[jogo.jogadores[0]]
});


return;

}




if(comando.startsWith("jogar")){


let jogo=jogos[id];

if(!jogo)return;


let numero=parseInt(comando.split(" ")[1]);


let mao=jogo.cartas[usuario];


let index=mao.findIndex(c=>c.valor===numero);



if(index===-1){

return sock.sendMessage(id,{
text:"❌ Você não possui essa carta."
});

}



let carta=mao[index];


jogo.mesa=carta;

mao.splice(index,1);



if(mao.length===0){

await sock.sendMessage(id,{
text:`🏆 *VENCEDOR DO UNO* 🏴‍☠️

👤 @${usuario.split("@")[0]}

🍖 Conquistou a Grand Line!`,
mentions:[usuario]
});

delete jogos[id];

return;

}



jogo.turno++;

if(jogo.turno>=jogo.jogadores.length)
jogo.turno=0;



await sock.sendMessage(id,{
text:`🃏 Carta jogada:

${cartaTexto(c)}

🎴 Suas cartas:
${mao.map(c=>c.valor).join(", ")}

➡️ Próximo:
@${jogo.jogadores[jogo.turno].split("@")[0]}`,
mentions:[
jogo.jogadores[jogo.turno]
]
});


return;

}




if(comando==="comprar"){


let jogo=jogos[id];

if(!jogo)return;


let carta=jogo.baralho.pop();


jogo.cartas[usuario].push(carta);


return sock.sendMessage(id,{
text:`🃏 Você comprou:

${cartaTexto(carta)}`
});


}





await sock.sendMessage(id,{
text:`🃏 *UNO DA GRAND LINE* 🏴‍☠️

Comandos:

!uno criar
!uno entrar
!uno iniciar
!uno jogar número
!uno comprar`
});


}

};
