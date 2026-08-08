let jogo = {};

module.exports = {
nome:"ppt",
comando:"ppt",

executar: async(sock,msg)=>{

let id = msg.key.remoteJid;
let usuario = msg.key.participant || id;

let texto = msg.message?.conversation ||
msg.message?.extendedTextMessage?.text ||
"";

let comando = texto.replace("!ppt","").trim().toLowerCase();


if(comando === "desafio"){

jogo[id] = {
criador: usuario,
jogadores:[usuario],
escolhas:{}
};


return sock.sendMessage(id,{
text:`✊ *TORNEIO PEDRA PAPEL TESOURA* 🏴‍☠️

⚔️ Desafio criado!

Jogadores:
1️⃣ @${usuario.split("@")[0]}

Para entrar:
!ppt entrar

Máximo: 4 jogadores`,
mentions:[usuario]
});

}



if(comando === "entrar"){

if(!jogo[id]){
return sock.sendMessage(id,{
text:"❌ Nenhum torneio aberto."
});
}


if(jogo[id].jogadores.includes(usuario)){
return;
}


if(jogo[id].jogadores.length >= 4){
return sock.sendMessage(id,{
text:"⚠️ O torneio já tem 4 jogadores!"
});
}


jogo[id].jogadores.push(usuario);


return sock.sendMessage(id,{
text:`⚔️ Pirata entrou no torneio!

👥 Jogadores:
${jogo[id].jogadores.length}/4`
});

}



if(comando === "iniciar"){

if(!jogo[id]){
return;
}


return sock.sendMessage(id,{
text:`🔥 *BATALHA INICIADA!* 🏴‍☠️

Jogadores:
${jogo[id].jogadores.map((j,i)=>`${i+1}️⃣ @${j.split("@")[0]}`).join("\n")}

Escolham:

!ppt pedra
!ppt papel
!ppt tesoura`,
mentions:jogo[id].jogadores
});

}



let escolha = comando;


if(!["pedra","papel","tesoura"].includes(escolha)){
return sock.sendMessage(id,{
text:"Use:\n!ppt pedra\n!ppt papel\n!ppt tesoura"
});
}


if(!jogo[id]){
return;
}


jogo[id].escolhas[usuario] = escolha;


let todos = jogo[id].jogadores.every(j=>jogo[id].escolhas[j]);


if(!todos){

return sock.sendMessage(id,{
text:"✅ Escolha recebida! Aguardando outros piratas..."
});

}



let resultado = `✊ *RESULTADO DO TORNEIO* 🏴‍☠️\n\n`;


for(let j of jogo[id].jogadores){

resultado += `👤 @${j.split("@")[0]}: ${jogo[id].escolhas[j]}\n`;

}


resultado += "\n🍖 Grande batalha da Grand Line!";


await sock.sendMessage(id,{
text:resultado,
mentions:jogo[id].jogadores
});


delete jogo[id];

}

};
