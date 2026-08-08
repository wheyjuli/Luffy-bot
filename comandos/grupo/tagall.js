module.exports = {
nome:"tagall",
comando:"tagall",

executar: async(sock,msg)=>{

let grupo = await sock.groupMetadata(msg.key.remoteJid);

let membros = grupo.participants.map(p=>p.id);

await sock.sendMessage(msg.key.remoteJid,{
text:"📢 *CHAMANDO A TRIPULAÇÃO* 🏴‍☠️",
mentions:membros
});

}
};
