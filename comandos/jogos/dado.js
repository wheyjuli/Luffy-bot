const fs = require("fs");

const arquivo = "./database/dinheiro.json";

module.exports = {
nome:"dado",
comando:"dado",

executar: async(sock,msg)=>{


let id = msg.key.participant || msg.key.remoteJid;


let dados = {};

if(fs.existsSync(arquivo)){
dados = JSON.parse(fs.readFileSync(arquivo));
}


let numero = Math.floor(Math.random()*6)+1;

let recompensa = 0;
let texto = "";


if(numero === 6){

recompensa = 100;
texto = "🔥 Golpe perfeito do pirata!";

}
else if(numero === 5){

recompensa = 50;
texto = "⚔️ Boa jogada!";

}
else if(numero === 1){

recompensa = -20;
texto = "☠️ Azar de pirata!";

}
else{

texto = "🍖 Continue tentando!";

}



dados[id] = (dados[id] || 0) + recompensa;


if(dados[id] < 0){
dados[id] = 0;
}


fs.writeFileSync(
arquivo,
JSON.stringify(dados,null,2)
);



await sock.sendMessage(msg.key.remoteJid,{
text:`🎲 *DADO DA GRAND LINE* 🏴‍☠️

Rolando...

🎲 Resultado: ${numero}

${texto}

💰 Recompensa:
${recompensa >= 0 ? "+" : ""}${recompensa} berries

💵 Saldo:
${dados[id]} berries`
});


}

};
