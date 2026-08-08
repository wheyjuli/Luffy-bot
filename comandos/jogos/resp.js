module.exports = {
nome:"resp",
comando:"resp",

executar: async(sock,msg)=>{

let texto =
msg.message?.conversation ||
"";

let resposta = texto.split(" ")[1];

let quiz = require("./quiz.js");

if(quiz.responder){
await quiz.responder(sock,msg,resposta);
}

}

};
