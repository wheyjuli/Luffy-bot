const fs = require("fs");

const arquivo = "./database/dinheiro.json";

module.exports = {
nome:"roleta",
comando:"roleta",

executar: async(sock,msg)=>{

let id = msg.key.participant || msg.key.remoteJid;


let dados = {};

if(fs.existsSync(arquivo)){
dados = JSON.parse(fs.readFileSync(arquivo));
}


let premio = Math.floor(Math.random()*100)+1;


dados[id] = (dados[id] || 0) + premio;


fs.writeFileSync(
arquivo,
JSON.stringify(dados,null,2)
);



let extra = "";

if(premio >= 80){
extra = "🔥 Prêmio lendário da Grand Line!";
}
else if(premio <= 10){
extra = "😅 Pouca sorte, pirata!";
}
else{
extra = "🍖 Boa viagem!";
}



await sock.sendMessage(msg.key.remoteJid,{
text:`🎡 *ROLETA DA GRAND LINE* 🏴‍☠️

🎰 Girando...

💰 Você ganhou:
${premio} berries

${extra}

💵 Seu saldo:
${dados[id]} berries`
});


}

};
