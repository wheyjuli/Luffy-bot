const config = require("./config");

function isDono(msg){

    // Se foi enviado pelo próprio número conectado do bot
    if(msg.key.fromMe){
        return true;
    }


    let usuarios = [];


    if(msg.key.participant){
        usuarios.push(msg.key.participant);
    }


    if(msg.key.remoteJid){
        usuarios.push(msg.key.remoteJid);
    }


    usuarios = usuarios.map(x =>
        x.split("@")[0].replace(/\D/g,"")
    );


    let dono = String(config.dono)
    .replace(/\D/g,"");


    return usuarios.includes(dono);
}


module.exports = {
    isDono
};
