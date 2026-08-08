const { exec } = require("child_process");
const fs = require("fs");

module.exports = {
    nome: "ytmp3",
    comando: "ytmp3",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;

        const texto =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        const link = texto.replace(/^!ytmp3\s*/i, "").trim();

        if (!link) {
            return sock.sendMessage(id, {
                text:
`🎵 *YTMP3* 🏴‍☠️

📌 Use:
!ytmp3 link do YouTube

Exemplo:
!ytmp3 https://youtu.be/xxxxx

⚓ Baú dos Tesouros`
            });
        }

        // Aceita somente links do YouTube
        if (
            !link.includes("youtube.com") &&
            !link.includes("youtu.be")
        ) {
            return sock.sendMessage(id, {
                text:
`❌ *Link inválido!*

🎵 Envie um link do YouTube.

Exemplo:
!ytmp3 https://youtu.be/xxxxx`
            });
        }

        const audio = "./ytmp3.mp3";

        if (fs.existsSync(audio)) {
            try {
                fs.unlinkSync(audio);
            } catch (e) {}
        }

        await sock.sendMessage(id, {
            text:
`🎵 *YTMP3* 🎵

🔎 Analisando o vídeo...

⏳ Buscando informações...

🏴‍☠️ Aguarde, pirata!`
        });

        // Busca informações
        exec(
            `yt-dlp --dump-single-json --skip-download "${link}"`,
            async (erro, stdout) => {

                if (erro || !stdout.trim()) {

                    console.log("Erro informações ytmp3:", erro);

                    return sock.sendMessage(id, {
                        text:
`❌ *Não consegui acessar esse vídeo.*

Verifique se o link está correto.`
                    });

                }

                try {

                    const dados = JSON.parse(stdout);

                    const titulo =
                        dados.title ||
                        "Desconhecido";

                    const artista =
                        dados.artist ||
                        dados.uploader ||
                        dados.channel ||
                        "Desconhecido";

                    const segundos =
                        Math.floor(Number(dados.duration || 0));

                    const duracao =
                        dados.duration_string ||
                        formatarDuracao(segundos);

                    const visualizacoes =
                        Number(dados.view_count || 0);

                    const publicado =
                        dados.upload_date
                            ? formatarData(dados.upload_date)
                            : "Desconhecido";

                    let descricao =
                        dados.description ||
                        "Sem descrição.";

                    descricao =
                        descricao
                            .replace(/\s+/g, " ")
                            .trim();

                    if (descricao.length > 500) {
                        descricao =
                            descricao.substring(0, 500) + "...";
                    }

                    /*
                     * MOSTRA A PRÉVIA DO LINK
                     */

                    await sock.sendMessage(id, {
                        text: link
                    });

                    /*
                     * INFORMAÇÕES DA MÚSICA
                     */

                    await sock.sendMessage(id, {
                        text:
`🎵 *Música Encontrada* 🎵

📌 *Título:* ${titulo}
👤 *Artista/Canal:* ${artista}
⏱ *Duração:* ${duracao} (${segundos} segundos)
👀 *Visualizações:* ${formatarNumero(visualizacoes)}
📅 *Publicado:* ${publicado}
📜 *Descrição:* ${descricao}
🔗 *Link:* ${link}

🎧 *Baixando e processando sua música, aguarde...*`
                    });

                    /*
                     * DOWNLOAD DO ÁUDIO
                     */

                    exec(
                        `yt-dlp -x --audio-format mp3 -o "${audio}" "${link}"`,
                        async (erroDownload) => {

                            if (
                                erroDownload ||
                                !fs.existsSync(audio)
                            ) {

                                console.log(
                                    "Erro download ytmp3:",
                                    erroDownload
                                );

                                return sock.sendMessage(id, {
                                    text:
`❌ *Erro ao baixar o áudio.*

Verifique se o vídeo está disponível.`
                                });
                            }

                            /*
                             * ENVIA O MP3
                             */

                            try {

                                await sock.sendMessage(id, {
                                    audio: {
                                        url: audio
                                    },
                                    mimetype: "audio/mpeg",
                                    fileName:
                                        `${limparNome(titulo)}.mp3`
                                });

                            } catch (e) {

                                console.log(
                                    "Erro ao enviar ytmp3:",
                                    e
                                );

                                await sock.sendMessage(id, {
                                    text:
                                        "❌ Erro ao enviar o áudio."
                                });

                            }

                            /*
                             * LIMPA O ARQUIVO
                             */

                            if (fs.existsSync(audio)) {

                                try {
                                    fs.unlinkSync(audio);
                                } catch (e) {}

                            }

                        }
                    );

                } catch (e) {

                    console.log(
                        "Erro JSON ytmp3:",
                        e
                    );

                    await sock.sendMessage(id, {
                        text:
                            "❌ Erro ao processar as informações."
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
        Math.floor((segundos % 3600) / 60);

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

    return Number(numero).toLocaleString("pt-BR");
}


function formatarData(data) {

    if (!data || data.length !== 8) {
        return "Desconhecido";
    }

    const ano = data.substring(0, 4);
    const mes = data.substring(4, 6);
    const dia = data.substring(6, 8);

    return `${dia}/${mes}/${ano}`;
}


function limparNome(nome) {

    return nome
        .replace(/[\\/:*?"<>|]/g, "")
        .substring(0, 100);
}
