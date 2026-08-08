const fs=require("fs");

module.exports={
nome:"resetadv",
comando:"resetadv",

executar:async(sock,msg)=>{

let user=msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

if(!user)return;


let dados={};

if(fs.existsSync("./advertencias.json")){
dados=JSON.parse(fs.readFileSync("./advertencias.json"));
}

delete dados[user];


fs.writeFileSync(
"./advertencias.json",
JSON.stringify(dados,null,2)
);


sock.sendMessage(msg.key.remoteJid,{
text:"♻️ Advertências resetadas."
});

}

};
