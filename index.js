const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const fs = require("fs");


let comandos = {};


function carregarComandos() {

    comandos = {};

    const categorias = fs.readdirSync("./comandos");


    for (const categoria of categorias) {

        const pasta = `./comandos/${categoria}`;

        if (!fs.existsSync(pasta)) continue;


        for (const arquivo of fs.readdirSync(pasta)) {


            if (arquivo.endsWith(".js")) {

                try {

                    const comando = require(`${pasta}/${arquivo}`);

                    if (comando.comando) {
                        comandos[comando.comando] = comando;
                    }


                } catch (e) {

                    console.log("Erro carregando comando:", arquivo);

                }

            }

        }

    }


    global.comandosCarregados = Object.keys(comandos).length;

console.log(
    "✅ Comandos carregados:",
    global.comandosCarregados
);

}



async function start() {


    const { state, saveCreds } = await useMultiFileAuthState("./session");


    const sock = makeWASocket({

    auth: state,

    logger: pino({
        level: "silent"
    }),

    generateHighQualityLinkPreview: true

});



    sock.ev.on("creds.update", saveCreds);



    if (!state.creds.registered) {

        setTimeout(async () => {

            try {

                const numero = "558888489244";

                const codigo = await sock.requestPairingCode(numero);


                console.log("");

                console.log("🔑 CÓDIGO DE PAREAMENTO:");

                console.log(codigo);

                console.log("");


            } catch (e) {

                console.log("❌ Erro ao gerar código:", e.message);

            }


        }, 8000);

    }



    carregarComandos();



    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {



        if (connection === "open") {

            console.log("");

            console.log("🏴‍☠️ LUFFY BOT CONECTADO!");

            console.log("");

        }



        if (connection === "close") {


            const erro =
            lastDisconnect?.error?.output?.statusCode;


            console.log("❌ Conexão fechada:", erro);



            if (erro !== DisconnectReason.loggedOut) {

                console.log("🔄 Reconectando...");

                setTimeout(start, 5000);


            } else {

                console.log("⚠️ Sessão deslogada. Apague a pasta session.");

            }


        }


    });



    sock.ev.on("messages.upsert", async ({ messages }) => {


        const msg = messages[0];


        if (!msg.message) return;



        const texto =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        "";



        if (!texto.startsWith("!")) return;



        const args = texto
        .slice(1)
        .trim()
        .split(" ");



        const comando = args.shift().toLowerCase();



        if (comandos[comando]) {


            try {


                await comandos[comando].executar(
                    sock,
                    msg,
                    args
                );


            } catch (e) {


                console.log("Erro comando:", e);


            }


        }


    });


}



start();
