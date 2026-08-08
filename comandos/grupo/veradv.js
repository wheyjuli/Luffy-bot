const fs = require("fs");

module.exports = {
nome:"veradv",
comando:"veradv",

executar: async(sock,msg)=>{

let texto = msg.message?.conversation || "";

let user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

if(!user){
return sock.sendMessage(msg.key.remoteJid,{
text:"⚠️ Marque um usuário."
});
}

let dados={};

if(fs.existsSync("./advertencias.json")){
dados=JSON.parse(fs.readFileSync("./advertencias.json"));
}

sock.sendMessage(msg.key.remoteJid,{
text:`⚠️ Advertências de @${user.split("@")[0]}:

${dados[user] || 0}/3`,
mentions:[user]
});

}

};
