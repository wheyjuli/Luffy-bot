const { exec } = require("child_process");
const fs = require("fs");

module.exports = {
    nome: "play2",
    comando: "play2",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;

        const texto =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        const busca = texto.replace(/^!play2\s*/i, "").trim();

        if (!busca) {
            return sock.sendMessage(id, {
                text:
`🎥 *PLAY 2* 🏴‍☠️

📌 Use:
!play2 nome do vídeo

🎬 Baú dos Tesouros`
            });
        }

        const video = "./play2.mp4";

        if (fs.existsSync(video)) {
            try {
                fs.unlinkSync(video);
            } catch (e) {}
        }

        await sock.sendMessage(id, {
            text:
`🎥 *Procurando vídeo...* 🎥

🔎 Pesquisa:
${busca}

🏴‍☠️ Aguarde, procurando o tesouro...`
        });

        exec(
            `yt-dlp --dump-single-json --skip-download "ytsearch1:${busca}"`,
            async (erro, stdout) => {

                if (erro || !stdout.trim()) {
                    return sock.sendMessage(id, {
                        text: "❌ Não encontrei esse vídeo."
                    });
                }

                try {

                    const dados = JSON.parse(stdout);

                    const titulo =
                        dados.title || "Desconhecido";

                    const canal =
                        dados.uploader ||
                        dados.channel ||
                        "Desconhecido";

                    const segundos =
                        Math.floor(Number(dados.duration || 0));

                    const duracao =
                        dados.duration_string ||
                        formatarDuracao(segundos);

                    const views =
                        Number(dados.view_count || 0);

                    const link =
                        dados.webpage_url ||
                        dados.original_url ||
                        "Indisponível";

                    let descricao =
                        dados.description ||
                        "Sem descrição.";

                    descricao =
                        descricao.replace(/\s+/g, " ").trim();

                    if (descricao.length > 500) {
                        descricao =
                            descricao.substring(0, 500) + "...";
                    }

                    // Prévia
                    if (link !== "Indisponível") {
                        await sock.sendMessage(id, {
                            text: link
                        });
                    }

                    // Informações
                    await sock.sendMessage(id, {
                        text:
`🎥 *Vídeo Encontrado* 🎥

📌 *Título:* ${titulo}
👤 *Canal:* ${canal}
⏱ *Duração:* ${duracao} (${segundos} segundos)
👀 *Visualizações:* ${formatarNumero(views)}
📅 *Publicado:* ${
    dados.upload_date
        ? formatarData(dados.upload_date)
        : "Desconhecido"
}
📜 *Descrição:* ${descricao}
🔗 *Link:* ${link}

🎬 *Baixando e processando seu vídeo, aguarde...*`
                    });

                    // Download MP4
                    exec(
                        `yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]" --merge-output-format mp4 -o "${video}" "ytsearch1:${busca}"`,
                        async (erroDownload) => {

                            if (
                                erroDownload ||
                                !fs.existsSync(video)
                            ) {

                                console.log(
                                    "Erro play2:",
                                    erroDownload
                                );

                                return sock.sendMessage(id, {
                                    text:
`❌ Não consegui baixar o vídeo.

💡 O vídeo pode ser grande demais ou não estar disponível.`
                                });
                            }

                            try {

                                await sock.sendMessage(id, {
                                    video: {
                                        url: video
                                    },
                                    mimetype: "video/mp4",
                                    fileName:
                                        `${limparNome(titulo)}.mp4`,
                                    caption:
`🎬 *Vídeo pronto!* 🏴‍☠️

📌 ${titulo}

⚓ Luffy Bot
🍖 Boa aventura!`
                                });

                            } catch (e) {

                                console.log(
                                    "Erro ao enviar vídeo:",
                                    e
                                );

                                await sock.sendMessage(id, {
                                    text:
                                        "❌ Erro ao enviar o vídeo."
                                });

                            }

                            // Limpeza
                            if (fs.existsSync(video)) {
                                try {
                                    fs.unlinkSync(video);
                                } catch (e) {}
                            }

                        }
                    );

                } catch (e) {

                    console.log(
                        "Erro informações play2:",
                        e
                    );

                    await sock.sendMessage(id, {
                        text:
                            "❌ Erro ao obter informações do vídeo."
                    });

                }

            }
        );
    }
};


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
