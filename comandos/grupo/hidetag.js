module.exports = {
nome:"hidetag",
comando:"hidetag",

executar: async(sock,msg)=>{

let grupo = await sock.groupMetadata(msg.key.remoteJid);

let membros = grupo.participants.map(p=>p.id);

await sock.sendMessage(msg.key.remoteJid,{
text:"👻 Mensagem secreta da tripulação 🏴‍☠️",
mentions:membros
});

}
};
