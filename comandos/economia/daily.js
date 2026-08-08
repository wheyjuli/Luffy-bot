const fs = require("fs");

const arquivo = "./database/dinheiro.json";
const diario = "./database/daily.json";

module.exports = {
nome:"daily",
comando:"daily",

executar: async(sock,msg)=>{

let id = msg.key.participant || msg.key.remoteJid;


let dados = {};
let dias = {};


if(fs.existsSync(arquivo)){
dados = JSON.parse(fs.readFileSync(arquivo));
}


if(fs.existsSync(diario)){
dias = JSON.parse(fs.readFileSync(diario));
}


let hoje = new Date().toLocaleDateString();


if(dias[id] === hoje){

return sock.sendMessage(msg.key.remoteJid,{
text:"⏳ Você já pegou seu prêmio diário, pirata!\n\nVolte amanhã 🏴‍☠️"
});

}


let premio = Math.floor(Math.random()*500)+100;


dados[id] = (dados[id] || 0) + premio;

dias[id] = hoje;


fs.writeFileSync(
arquivo,
JSON.stringify(dados,null,2)
);


fs.writeFileSync(
diario,
JSON.stringify(dias,null,2)
);



await sock.sendMessage(msg.key.remoteJid,{
text:`🎁 *RECOMPENSA DIÁRIA* 🏴‍☠️

💰 Você recebeu:
${premio} berries

💵 Saldo:
${dados[id]} berries

🍖 Volte amanhã para pegar mais!`
});


}

};
