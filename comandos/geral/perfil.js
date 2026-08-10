// 🏴‍☠️ LUFFY BOT
// 👤 PERFIL PIRATA — fonte nova + foto automática

const fs = require("fs");
const path = require("path");

const database = path.join(process.cwd(), "database");
const arquivo = path.join(database, "perfis.json");

const CONFIG = {
    valorPrograma: "R$2.503",
    bot: "𝑳𝑼𝑭𝑭𝒀 𝑩𝑶𝑻 🤖",
    criadora: "Maju"
};

// ==========================================
// BANCO
// ==========================================

function prepararBanco() {

    if (!fs.existsSync(database)) {
        fs.mkdirSync(database, {
            recursive: true
        });
    }

    if (!fs.existsSync(arquivo)) {
        fs.writeFileSync(arquivo, "{}");
    }
}

function carregar() {

    prepararBanco();

    try {

        const texto =
            fs.readFileSync(arquivo, "utf8").trim();

        return texto
            ? JSON.parse(texto)
            : {};

    } catch (erro) {

        console.log(
            "⚠️ Erro no perfis.json:",
            erro.message
        );

        return {};
    }
}

function salvar(dados) {

    prepararBanco();

    fs.writeFileSync(
        arquivo,
        JSON.stringify(dados, null, 2)
    );
}

// ==========================================
// USUÁRIO
// ==========================================

function pegarUsuario(msg) {

    const contexto =
        msg.message
            ?.extendedTextMessage
            ?.contextInfo;

    if (
        contexto?.mentionedJid &&
        contexto.mentionedJid.length
    ) {
        return contexto.mentionedJid[0];
    }

    if (contexto?.participant) {
        return contexto.participant;
    }

    return (
        msg.key.participant ||
        msg.participant ||
        msg.key.remoteJid
    );
}

function pegarNumero(usuario) {

    return String(usuario || "")
        .split("@")[0]
        .replace(/\D/g, "");
}

// ==========================================
// NOVO PERFIL
// ==========================================

function novoPerfil() {

    return {

        mensagens: 0,
        comandos: 0,
        figurinhas: 0,
        imagens: 0,
        videos: 0,
        audios: 0,
        documentos: 0,

        vip: false,

        gado: Math.floor(Math.random() * 101),
        puta: Math.floor(Math.random() * 101),
        gostosura: Math.floor(Math.random() * 101),
        gay: Math.floor(Math.random() * 101),
        lindo: Math.floor(Math.random() * 101),

        criadoEm: new Date().toISOString()
    };
}

// ==========================================
// NOME
// ==========================================

async function pegarNome(sock, chat, usuario) {

    let nome =
        `Pirata ${pegarNumero(usuario)}`;

    try {

        if (chat.endsWith("@g.us")) {

            const grupo =
                await sock.groupMetadata(chat);

            const membro =
                grupo.participants.find(
                    p => p.id === usuario
                );

            if (membro?.notify) {
                nome = membro.notify;
            }
        }

    } catch (erro) {}

    return nome;
}

// ==========================================
// CARGO
// ==========================================

async function pegarCargo(sock, chat, usuario) {

    if (!chat.endsWith("@g.us")) {
        return "Usuário";
    }

    try {

        const grupo =
            await sock.groupMetadata(chat);

        const membro =
            grupo.participants.find(
                p => p.id === usuario
            );

        if (!membro) {
            return "Membro";
        }

        if (
            membro.admin === "superadmin"
        ) {
            return "Dono do Grupo";
        }

        if (membro.admin) {
            return "Administrador";
        }

        return "Membro";

    } catch (erro) {

        return "Membro";
    }
}

// ==========================================
// BIO
// ==========================================

async function pegarBio(sock, usuario) {

    try {

        const status =
            await sock.fetchStatus(usuario);

        if (status?.status) {

            return String(status.status)
                .replace(/\n/g, " ")
                .slice(0, 120);
        }

    } catch (erro) {}

    return "sem bio";
}

// ==========================================
// FOTO
// ==========================================

async function pegarFotoPerfil(sock, usuario) {

    try {

        const url =
            await sock.profilePictureUrl(
                usuario,
                "image"
            );

        return url || null;

    } catch (erro) {

        return null;
    }
}

// ==========================================
// FORMATAÇÃO
// ==========================================

function numero(valor) {

    return Number(valor || 0)
        .toLocaleString("pt-BR");
}

function vipTexto(vip) {

    return vip
        ? "𝐒𝐈𝐌 ✅"
        : "𝐍𝐀̃𝐎 ❌";
}

// ==========================================
// COMANDO
// ==========================================

module.exports = {

    nome: "perfil",
    comando: "perfil",

    executar: async (sock, msg) => {

        const chat =
            msg.key.remoteJid;

        const usuario =
            pegarUsuario(msg);

        const numeroUsuario =
            pegarNumero(usuario);

        // ======================================
        // BANCO
        // ======================================

        const dados = carregar();

        if (!dados[usuario]) {

            dados[usuario] =
                novoPerfil();

            salvar(dados);
        }

        const perfil =
            dados[usuario];

        // ======================================
        // DADOS ATUAIS
        // ======================================

        const nome =
            await pegarNome(
                sock,
                chat,
                usuario
            );

        const cargo =
            await pegarCargo(
                sock,
                chat,
                usuario
            );

        const bio =
            await pegarBio(
                sock,
                usuario
            );

        const foto =
            await pegarFotoPerfil(
                sock,
                usuario
            );

        // ======================================
        // GARANTIR NÚMEROS
        // ======================================

        perfil.mensagens =
            Number(perfil.mensagens || 0);

        perfil.comandos =
            Number(perfil.comandos || 0);

        perfil.figurinhas =
            Number(perfil.figurinhas || 0);

        perfil.imagens =
            Number(perfil.imagens || 0);

        perfil.videos =
            Number(perfil.videos || 0);

        perfil.audios =
            Number(perfil.audios || 0);

        perfil.documentos =
            Number(perfil.documentos || 0);

        salvar(dados);

        // ======================================
        // PERFIL
        // ======================================

        const texto =
`🏴‍☠️ *𝑳𝑼𝑭𝑭𝒀 𝑩𝑶𝑻* 🤖

╭━━〔 𝐃𝐀𝐃𝐎𝐒 𝐃𝐎 𝐔𝐒𝐄𝐑 〕━━╮
┃ ✨ 𝐍𝐈𝐂𝐊 ➜ ${nome}
┃ 🕊️ 𝐍𝐔𝐌𝐄𝐑𝐎 ➜ ${numeroUsuario}
┃ 💯 𝐁𝐈𝐎 ➜ ${bio}
┃ 🌪️ 𝐕𝐈𝐏 ➜ ${vipTexto(perfil.vip)}
┃ 🥊 𝐂𝐀𝐑𝐆𝐎 ➜ ${cargo}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄 ⚡ 〕━━╮
┃ 💬 𝐌𝐄𝐍𝐒𝐀𝐆𝐄𝐍𝐒 ➜ ${numero(perfil.mensagens)}
┃ 📜 𝐂𝐌𝐃𝐒 ➜ ${numero(perfil.comandos)}
┃ 🧸 𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀𝐒 ➜ ${numero(perfil.figurinhas)}
┃ 🖼️ 𝐈𝐌𝐀𝐆𝐄𝐍𝐒 ➜ ${numero(perfil.imagens)}
┃ 🎥 𝐕𝐈𝐃𝐄𝐎𝐒 ➜ ${numero(perfil.videos)}
┃ 🎧 𝐀𝐔𝐃𝐈𝐎𝐒 ➜ ${numero(perfil.audios)}
┃ 📄 𝐃𝐎𝐂𝐔𝐌𝐄𝐍𝐓𝐎𝐒 ➜ ${numero(perfil.documentos)}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋𝐈𝐃𝐀𝐃𝐄 📝 〕━━╮
┃ 🐂 𝐆𝐀𝐃𝐎 ➜ ${perfil.gado}%
┃ 🔞 𝐏𝐔𝐓𝐀 ➜ ${perfil.puta}%
┃ 😋 𝐆𝐎𝐒𝐓𝐎𝐒𝐔𝐑𝐀 ➜ ${perfil.gostosura}%
┃ 🏳️‍🌈 𝐆𝐀𝐘 ➜ ${perfil.gay}%
┃ 😻 𝐋𝐈𝐍𝐃𝐎(𝐀) ➜ ${perfil.lindo}%
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 𝐈𝐍𝐅𝐎 𝐃𝐎 𝐁𝐎𝐓 🤖 〕━━╮
┃ 😈 𝐏𝐑𝐎𝐆𝐑𝐀𝐌𝐀 ➜ ${CONFIG.valorPrograma}
┃ 🏴‍☠️ 𝐁𝐎𝐓 ➜ ${CONFIG.bot}
┃ 👑 𝐂𝐑𝐈𝐀𝐃𝐎𝐑𝐀 ➜ ${CONFIG.criadora}
┃ ⚓ 𝐓𝐄𝐌𝐀 ➜ One Piece
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 𝐂𝐎𝐍𝐒𝐄𝐋𝐇𝐎 🧭 〕━━╮
┃ "No mar, cada pirata escreve
┃ sua própria história."
╰━━━━━━━━━━━━━━━━━━━━━━╯

🍖 *Eu vou ser o Rei dos Piratas!*

🏴‍☠️ *${CONFIG.bot}*`;

        // ======================================
        // ENVIAR COM FOTO
        // ======================================

        if (foto) {

            try {

                return await sock.sendMessage(
                    chat,
                    {
                        image: {
                            url: foto
                        },
                        caption: texto,
                        mentions: [usuario]
                    }
                );

            } catch (erro) {

                console.log(
                    "⚠️ Erro ao enviar foto:",
                    erro.message
                );
            }
        }

        // ======================================
        // SEM FOTO
        // ======================================

        return await sock.sendMessage(
            chat,
            {
                text: texto,
                mentions: [usuario]
            }
        );
    }
};
