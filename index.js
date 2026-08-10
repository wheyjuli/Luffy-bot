const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const fs = require("fs");
const path = require("path");

let comandos = {};

const PERFIS_FILE = path.join(
    process.cwd(),
    "database",
    "perfis.json"
);

// ==========================================
// BANCO DE PERFIS
// ==========================================

function prepararBanco() {

    if (!fs.existsSync("./database")) {
        fs.mkdirSync("./database", {
            recursive: true
        });
    }

    if (!fs.existsSync(PERFIS_FILE)) {
        fs.writeFileSync(
            PERFIS_FILE,
            "{}"
        );
    }
}

function carregarPerfis() {

    prepararBanco();

    try {

        const texto =
            fs.readFileSync(
                PERFIS_FILE,
                "utf8"
            );

        return texto.trim()
            ? JSON.parse(texto)
            : {};

    } catch (e) {

        console.log(
            "⚠️ Erro lendo perfis:",
            e.message
        );

        return {};
    }
}

function salvarPerfis(dados) {

    prepararBanco();

    fs.writeFileSync(
        PERFIS_FILE,
        JSON.stringify(
            dados,
            null,
            2
        )
    );
}

// ==========================================
// CRIAR PERFIL
// ==========================================

function criarPerfil() {

    return {

        mensagens: 0,
        comandos: 0,

        figurinhas: 0,
        imagens: 0,
        videos: 0,
        audios: 0,
        documentos: 0,

        vip: false,

        gado: Math.floor(
            Math.random() * 101
        ),

        puta: Math.floor(
            Math.random() * 101
        ),

        gostosura: Math.floor(
            Math.random() * 101
        ),

        gay: Math.floor(
            Math.random() * 101
        ),

        lindo: Math.floor(
            Math.random() * 101
        ),

        criadoEm:
            new Date().toISOString()
    };
}

// ==========================================
// IDENTIFICAR USUÁRIO
// ==========================================

function pegarUsuario(msg) {

    return (
        msg.key.participant ||
        msg.participant ||
        msg.key.remoteJid
    );
}

// ==========================================
// ATUALIZAR ESTATÍSTICAS
// ==========================================

function registrarMensagem(msg) {

    const usuario =
        pegarUsuario(msg);

    if (!usuario) return;

    // Ignora grupos como usuário
    if (
        usuario.endsWith("@g.us")
    ) {
        return;
    }

    const perfis =
        carregarPerfis();

    if (!perfis[usuario]) {
        perfis[usuario] =
            criarPerfil();
    }

    const perfil =
        perfis[usuario];

    // ------------------------------
    // TODA MENSAGEM
    // ------------------------------

    perfil.mensagens =
        Number(perfil.mensagens || 0) + 1;

    // ------------------------------
    // MÍDIAS
    // ------------------------------

    const mensagem =
        msg.message || {};

    if (mensagem.stickerMessage) {

        perfil.figurinhas =
            Number(perfil.figurinhas || 0) + 1;
    }

    if (mensagem.imageMessage) {

        perfil.imagens =
            Number(perfil.imagens || 0) + 1;
    }

    if (mensagem.videoMessage) {

        perfil.videos =
            Number(perfil.videos || 0) + 1;
    }

    if (mensagem.audioMessage) {

        perfil.audios =
            Number(perfil.audios || 0) + 1;
    }

    if (mensagem.documentMessage) {

        perfil.documentos =
            Number(perfil.documentos || 0) + 1;
    }

    salvarPerfis(perfis);
}

// ==========================================
// CARREGAR COMANDOS
// ==========================================

function carregarComandos() {

    comandos = {};

    const categorias =
        fs.readdirSync("./comandos");

    for (
        const categoria of categorias
    ) {

        const pasta =
            `./comandos/${categoria}`;

        if (
            !fs.existsSync(pasta)
        ) continue;

        for (
            const arquivo
            of fs.readdirSync(pasta)
        ) {

            if (
                !arquivo.endsWith(".js")
            ) continue;

            try {

                const comando =
                    require(
                        `${pasta}/${arquivo}`
                    );

                if (
                    comando.comando
                ) {

                    comandos[
                        comando.comando
                    ] = comando;
                }

            } catch (e) {

                console.log(
                    "Erro carregando comando:",
                    arquivo,
                    e.message
                );
            }
        }
    }

    global.comandosCarregados =
        Object.keys(comandos).length;

    console.log(
        "✅ Comandos carregados:",
        global.comandosCarregados
    );
}

// ==========================================
// REGISTRAR COMANDO
// ==========================================

function registrarComando(msg) {

    const usuario =
        pegarUsuario(msg);

    if (!usuario) return;

    if (
        usuario.endsWith("@g.us")
    ) return;

    const perfis =
        carregarPerfis();

    if (!perfis[usuario]) {

        perfis[usuario] =
            criarPerfil();
    }

    perfis[usuario].comandos =
        Number(
            perfis[usuario].comandos || 0
        ) + 1;

    salvarPerfis(perfis);
}

// ==========================================
// INICIAR BOT
// ==========================================

async function start() {

    const {
        state,
        saveCreds
    } =
        await useMultiFileAuthState(
            "./session"
        );

    const sock =
        makeWASocket({

            auth: state,

            logger: pino({
                level: "silent"
            }),

            generateHighQualityLinkPreview:
                true
        });

    sock.ev.on(
        "creds.update",
        saveCreds
    );

    // ======================================
    // PAIRING CODE
    // ======================================

    if (!state.creds.registered) {

        setTimeout(
            async () => {

                try {

                    const numero =
                        "558888489244";

                    const codigo =
                        await sock.requestPairingCode(
                            numero
                        );

                    console.log("");
                    console.log(
                        "🔑 CÓDIGO DE PAREAMENTO:"
                    );
                    console.log(
                        codigo
                    );
                    console.log("");

                } catch (e) {

                    console.log(
                        "❌ Erro ao gerar código:",
                        e.message
                    );
                }

            },
            8000
        );
    }

    carregarComandos();

    // ======================================
    // CONEXÃO
    // ======================================

    sock.ev.on(
        "connection.update",
        ({
            connection,
            lastDisconnect
        }) => {

            if (
                connection === "open"
            ) {

                console.log("");
                console.log(
                    "🏴‍☠️ LUFFY BOT CONECTADO!"
                );
                console.log("");
            }

            if (
                connection === "close"
            ) {

                const erro =
                    lastDisconnect
                        ?.error
                        ?.output
                        ?.statusCode;

                console.log(
                    "❌ Conexão fechada:",
                    erro
                );

                if (
                    erro !==
                    DisconnectReason.loggedOut
                ) {

                    console.log(
                        "🔄 Reconectando..."
                    );

                    setTimeout(
                        start,
                        5000
                    );

                } else {

                    console.log(
                        "⚠️ Sessão deslogada. Apague a pasta session."
                    );
                }
            }
        }
    );

    // ======================================
    // RECEBER MENSAGENS
    // ======================================

    sock.ev.on(
        "messages.upsert",
        async ({
            messages
        }) => {

            const msg =
                messages[0];

            if (
                !msg ||
                !msg.message
            ) {
                return;
            }

            // ==================================
            // CONTADOR EM TEMPO REAL
            // ==================================

            registrarMensagem(msg);

            // ==================================
            // TEXTO
            // ==================================

            const texto =
                msg.message.conversation ||
                msg.message.extendedTextMessage
                    ?.text ||
                msg.message.imageMessage
                    ?.caption ||
                msg.message.videoMessage
                    ?.caption ||
                "";

            // Se não for comando,
            // já terminou aqui.
            if (
                !texto.startsWith("!")
            ) {
                return;
            }

            // ==================================
            // SEPARAR COMANDO
            // ==================================

            const args =
                texto
                    .slice(1)
                    .trim()
                    .split(/\s+/);

            const comando =
                args
                    .shift()
                    ?.toLowerCase();

            if (!comando) {
                return;
            }

            // ==================================
            // CONTAR COMANDO
            // ==================================

            registrarComando(msg);

            // ==================================
            // EXECUTAR
            // ==================================

            if (
                comandos[comando]
            ) {

                try {

                    await comandos[
                        comando
                    ].executar(
                        sock,
                        msg,
                        args
                    );

                } catch (e) {

                    console.log(
                        "Erro comando:",
                        e
                    );
                }
            }
        }
    );
}

// ==========================================
// INICIAR
// ==========================================

start();
