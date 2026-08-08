const { exec } = require("child_process");
const fs = require("fs");

module.exports = {
    nome: "play",
    comando: "play",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;

        const texto =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        const musica =
            texto.replace(/^!play\s*/i, "").trim();

        if (!musica) {
            return sock.sendMessage(id, {
                text:
`🎵 *PLAY* 🎵

📌 Use:
!play nome da música

⚓ Baú dos Tesouros`
            });
        }

        const audio = "./musica.mp3";

        if (fs.existsSync(audio)) {
            try {
                fs.unlinkSync(audio);
            } catch (e) {}
        }

        await sock.sendMessage(id, {
            text:
`🎵 *Procurando música...* 🎵

🔎 Pesquisa:
${musica}

🏴‍☠️ *Baú dos Tesouros*
⏳ Aguarde...`
        });

        /*
         * PRIMEIRO:
         * pesquisa e pega o resultado REAL
         */

        exec(
            `yt-dlp --flat-playlist --dump-single-json "ytsearch1:${musica}"`,
            async (erro, stdout) => {

                if (erro || !stdout.trim()) {

                    console.log(
                        "Erro pesquisa:",
                        erro
                    );

                    return sock.sendMessage(id, {
                        text:
`❌ *Música não encontrada.*

🔎 Pesquisa:
${musica}`
                    });

                }

                try {

                    const pesquisa =
                        JSON.parse(stdout);

                    const resultado =
                        pesquisa.entries &&
                        pesquisa.entries[0];

                    if (!resultado) {

                        return sock.sendMessage(id, {
                            text:
                                "❌ Nenhum resultado encontrado."
                        });

                    }

                    /*
                     * LINK REAL DO RESULTADO
                     */

                    let link =
                        resultado.webpage_url ||
                        resultado.url;

                    if (
                        !link ||
                        !link.startsWith("http")
                    ) {

                        if (resultado.id) {
                            link =
                                `https://www.youtube.com/watch?v=${resultado.id}`;
                        }

                    }

                    if (!link) {

                        return sock.sendMessage(id, {
                            text:
                                "❌ Não consegui obter o link da música."
                        });

                    }

                    /*
                     * AGORA pegamos os dados
                     * EXATOS desse link.
                     */

                    exec(
                        `yt-dlp --dump-single-json --skip-download "${link}"`,
                        async (erroInfo, info) => {

                            if (
                                erroInfo ||
                                !info.trim()
                            ) {

                                console.log(
                                    "Erro informações:",
                                    erroInfo
                                );

                                return sock.sendMessage(id, {
                                    text:
                                        "❌ Erro ao obter informações da música."
                                });

                         }

                               try {

                                const dados =
                                    JSON.parse(info);

                                const titulo =
                                    dados.title ||
                                    resultado.title ||
                                    "Desconhecido";

                                const artista =
                                    dados.artist ||
                                    dados.artists?.join(", ") ||
                                    dados.uploader ||
                                    dados.channel ||
                                    "Desconhecido";

                                const segundos =
                                    Math.floor(
                                        Number(
                                            dados.duration || 0
                                        )
                                    );

                                const duracao =
                                    dados.duration_string ||
                                    formatarDuracao(segundos);

                                const visualizacoes =
                                    Number(
                                        dados.view_count || 0
                                    );

                                const publicado =
                                    dados.upload_date
                                        ? formatarData(
                                            dados.upload_date
                                        )
                                        : "Desconhecido";

                                let descricao =
                                    dados.description ||
                                    "Sem descrição.";

                                descricao =
                                    descricao
                                        .replace(/\s+/g, " ")
                                        .trim();

                                if (
                                    descricao.length > 500
                                ) {

                                    descricao =
                                        descricao.substring(
                                            0,
                                            500
                                        ) + "...";

                                }


                                /*
                                 * MOSTRA INFORMAÇÕES
                                 */

                                const textoInfo =
`${link}

🎵 *Música Encontrada* 🎵

📌 *Título:* ${titulo}
👤 *Artista/Canal:* ${artista}
⏱ *Duração:* ${duracao} (${segundos} segundos)
👀 *Visualizações:* ${formatarNumero(visualizacoes)}
📅 *Publicado:* ${publicado}
📜 *Descrição:* ${descricao}

🎧 *Baixando e processando sua música, aguarde...*`;

await sock.sendMessage(id, {
    text: textoInfo
});
                                /*
                                 * DOWNLOAD
                                 *
                                 * IMPORTANTE:
                                 * usa "link", não ytsearch1.
                                 */

                                exec(
                                   `yt-dlp --js-runtimes deno --remote-components ejs:github -x --audio-format mp3 -o "${audio}" "${link}"`,
                                    async (erroDownload) => {

                                        if (
                                            erroDownload ||
                                            !fs.existsSync(audio)
                                        ) {

                                            console.log(
                                                "Erro download:",
                                                erroDownload
                                            );

                                            return sock.sendMessage(
                                                id,
                                                {
                                                    text:
`❌ *Erro ao baixar a música.*

🎵 ${titulo}

Verifique se o vídeo está disponível.`
                                                }
                                            );

                                        }

                                        /*
                                         * ENVIA MP3
                                         */

                                        try {

                                            await sock.sendMessage(
                                                id,
                                                {
                                                    audio: {
                                                        url: audio
                                                    },
                                                    mimetype:
                                                        "audio/mpeg",
                                                    fileName:
                                                        `${limparNome(titulo)}.mp3`
                                                }
                                            );

                                        } catch (e) {

                                            console.log(
                                                "Erro ao enviar áudio:",
                                                e
                                            );

                                            await sock.sendMessage(
                                                id,
                                                {
                                                    text:
                                                        "❌ Não consegui enviar o áudio."
                                                }
                                            );

                                        }

                                        /*
                                         * LIMPA ARQUIVO
                                         */

                                        if (
                                            fs.existsSync(audio)
                                        ) {

                                            try {
                                                fs.unlinkSync(
                                                    audio
                                                );
                                            } catch (e) {}

                                        }

                                    }
                                );

                            } catch (e) {

                                console.log(
                                    "Erro JSON:",
                                    e
                                );

                                await sock.sendMessage(id, {
                                    text:
                                        "❌ Erro ao processar a música."
                                });

                            }

                        }
                    );

                } catch (e) {

                    console.log(
                        "Erro pesquisa JSON:",
                        e
                    );

                    await sock.sendMessage(id, {
                        text:
                            "❌ Erro ao pesquisar a música."
                    });

                }

            }
        );

    }
};


/* ============================= */
/* FUNÇÕES AUXILIARES             */
/* ============================= */

function formatarDuracao(segundos) {

    if (!segundos || segundos < 0) {
        return "Desconhecida";
    }

    const horas =
        Math.floor(segundos / 3600);

    const minutos =
        Math.floor(
            (segundos % 3600) / 60
        );

    const seg =
        segundos % 60;

    if (horas > 0) {

        return `${horas}:${String(minutos).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;

    }

    return `${minutos}:${String(seg).padStart(2, "0")}`;
}


function formatarNumero(numero) {

    if (!numero) {
        return "Não disponível";
    }

    return Number(numero)
        .toLocaleString("pt-BR");
}


function formatarData(data) {

    if (!data || data.length !== 8) {
        return "Desconhecido";
    }

    const ano =
        data.substring(0, 4);

    const mes =
        data.substring(4, 6);

    const dia =
        data.substring(6, 8);

    return `${dia}/${mes}/${ano}`;
}


function limparNome(nome) {

    return nome
        .replace(/[\\/:*?"<>|]/g, "")
        .substring(0, 100);
}
