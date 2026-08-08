const fs = require("fs");

let quizAtivo = {};

let perguntas = [
{
p:"Qual é o nome da espada de Zoro?",
a:"A",
op:"A) Wado Ichimonji\nB) Enma\nC) Shusui"
},
{
p:"Quem é o capitão dos Chapéus de Palha?",
a:"B",
op:"A) Zoro\nB) Luffy\nC) Sanji"
},
{
p:"Qual fruta Luffy comeu?",
a:"B",
op:"A) Mera Mera no Mi\nB) Gomu Gomu no Mi\nC) Goro Goro no Mi"
}
];


module.exports = {
nome:"quiz",
comando:"quiz",

executar: async(sock,msg)=>{

let id = msg.key.remoteJid;

let q = perguntas[Math.floor(Math.random()*perguntas.length)];


quizAtivo[id] = q;


await sock.sendMessage(id,{
text:`❓ *QUIZ ONE PIECE* 🏴‍☠️

${q.p}

${q.op}

💡 Responda:
!resp A
!resp B
!resp C`
});

}

};


// exporta para resposta
module.exports.responder = async(sock,msg,resposta)=>{

let id = msg.key.remoteJid;


if(!quizAtivo[id]) return;


let q = quizAtivo[id];


if(resposta.toUpperCase() === q.a){

await sock.sendMessage(id,{
text:`✅ *RESPOSTA CORRETA!* 🏴‍☠️

🍖 Você acertou o quiz!

💰 +50 berries`
});

}
else{

await sock.sendMessage(id,{
text:`❌ *RESPOSTA ERRADA!*

A resposta era:
${q.a}`
});

}


delete quizAtivo[id];

};
