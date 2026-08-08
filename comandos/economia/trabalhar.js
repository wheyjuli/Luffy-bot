const fs = require("fs");

const arquivo = "./database/dinheiro.json";

module.exports = {
nome:"trabalhar",
comando:"trabalhar",

executar: async(sock,msg)=>{


let id = msg.key.participant || msg.key.remoteJid;


let dados = {};

if(fs.existsSync(arquivo)){
dados = JSON.parse(fs.readFileSync(arquivo));
}


let ganho = Math.floor(Math.random()*300)+50;


dados[id] = (dados[id] || 0) + ganho;


fs.writeFileSync(
arquivo,
JSON.stringify(dados,null,2)
);



await sock.sendMessage(msg.key.remoteJid,{
text:`💼 *TRABALHO CONCLUÍDO!* 🏴‍☠️

💰 Você ganhou ${ganho} berries

💵 Novo saldo:
${dados[id]} berries 🍖`
});


}

};
