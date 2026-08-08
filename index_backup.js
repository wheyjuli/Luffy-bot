sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {


    if (!state.creds.registered && connection === "connecting") {

        try {

            await new Promise(resolve => setTimeout(resolve, 5000));


            const numero = "5588988489244";


            const codigo = await sock.requestPairingCode(numero);


            console.log("");

            console.log("🔑 CÓDIGO DE PAREAMENTO:");

            console.log(codigo);

            console.log("");


        } catch (e) {

            console.log("❌ Erro ao gerar código:", e.message);

        }

    }



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
