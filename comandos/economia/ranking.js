const fs = require("fs");

const arquivo = "./database/dinheiro.json";

module.exports = {
nome:"ranking",
comando:"ranking",

executar: async(sock,msg)=>{

let dados = {};

if(fs.existsSync(arquivo)){
dados = JSON.parse(fs.readFileSync(arquivo));
}


let lista = Object.entries(dados);


if(lista.length === 0){

return sock.sendMessage(msg.key.remoteJid,{
text:"🏆 *RANKING DA GRAND LINE* 🏴‍☠️\n\nNenhum pirata possui berries ainda."
});

}


lista.sort((a,b)=>b[1]-a[1]);


let texto = "🏆 *RANKING DA GRAND LINE* 🏴‍☠️\n\n";


lista.slice(0,10).forEach((p,i)=>{

texto += `${i+1}º 🏴‍☠️ ${p[0]}\n`;
texto += `💰 ${p[1]} berries\n\n`;

});


await sock.sendMessage(msg.key.remoteJid,{
text:texto
});


}

};
