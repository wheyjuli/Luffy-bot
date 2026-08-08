let jogos = {};

module.exports = {
    nome: "velha",
    comando: "velha",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;

        const texto =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        const arg = texto.replace("!velha", "").trim();

        if (!arg) {

            jogos[id] = ["1","2","3","4","5","6","7","8","9"];

            return sock.sendMessage(id,{
                text:
`❌⭕ *JOGO DA VELHA*

${tabuleiro(jogos[id])}

Escolha uma posição:

!velha 1
!velha 2
...
!velha 9`
            });

        }

        if (!jogos[id]) {
            return sock.sendMessage(id,{
                text:"Use primeiro:\n!velha"
            });
        }

        const jogo = jogos[id];

        const pos = Number(arg)-1;

        if (isNaN(pos) || pos < 0 || pos > 8) {
            return;
        }

        if (jogo[pos] == "❌" || jogo[pos] == "⭕") {

            return sock.sendMessage(id,{
                text:"⚠️ Casa ocupada!"
            });

        }

        jogo[pos] = "❌";

        if (venceu(jogo,"❌")) {

            delete jogos[id];

            return sock.sendMessage(id,{
                text:
`🏆 Você venceu!

${tabuleiro(jogo)}`
            });

        }

        let livres = [];

        jogo.forEach((v,i)=>{

            if(v!="❌" && v!="⭕"){
                livres.push(i);
            }

        });

        if(livres.length==0){

            delete jogos[id];

            return sock.sendMessage(id,{
                text:
`🤝 Empate!

${tabuleiro(jogo)}`
            });

        }

        const bot = livres[Math.floor(Math.random()*livres.length)];

        jogo[bot]="⭕";

        if(venceu(jogo,"⭕")){

            delete jogos[id];

            return sock.sendMessage(id,{
                text:
`🤖 Luffy venceu!

${tabuleiro(jogo)}`
            });

        }

        await sock.sendMessage(id,{
            text:
`❌⭕ *JOGO DA VELHA*

${tabuleiro(jogo)}

Sua vez!
Digite:

!velha 1-9`
        });

    }
};

function tabuleiro(t){

return `
${t[0]} | ${t[1]} | ${t[2]}
---------
${t[3]} | ${t[4]} | ${t[5]}
---------
${t[6]} | ${t[7]} | ${t[8]}
`;

}

function venceu(t,s){

const linhas=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

return linhas.some(l=>l.every(i=>t[i]==s));

}
