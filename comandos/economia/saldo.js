const fs = require("fs");

const arquivo = "./database/dinheiro.json";

module.exports = {
nome:"saldo",
comando:"saldo",

executar: async(sock,msg)=>{

let id = msg.key.participant || msg.key.remoteJid;

let dados = {};

if(fs.existsSync(arquivo)){
dados = JSON.parse(fs.readFileSync(arquivo));
}

let saldo = dados[id] || 0;


await sock.sendMessage(msg.key.remoteJid,{
text:`💵 *SALDO DO PIRATA* 🏴‍☠️

💰 ${saldo} berries

🍖 Continue sua aventura!`
});

}

};
