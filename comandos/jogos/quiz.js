// 🏴‍☠️ LUFFY BOT
// ❓ QUIZ ONE PIECE — versão melhorada

const jogos = {};

const perguntas = [
    {
        pergunta: "Qual fruta Luffy comeu?",
        opcoes: [
            "A) Mera Mera no Mi",
            "B) Gomu Gomu no Mi",
            "C) Goro Goro no Mi",
            "D) Yami Yami no Mi"
        ],
        resposta: "B"
    },

    {
        pergunta: "Qual é o sonho de Luffy?",
        opcoes: [
            "A) Ser Almirante",
            "B) Encontrar o All Blue",
            "C) Ser o Rei dos Piratas",
            "D) Ser o homem mais forte"
        ],
        resposta: "C"
    },

    {
        pergunta: "Quem é o espadachim dos Chapéus de Palha?",
        opcoes: [
            "A) Sanji",
            "B) Zoro",
            "C) Brook",
            "D) Franky"
        ],
        resposta: "B"
    },

    {
        pergunta: "Qual é o nome do navio atual dos Chapéus de Palha?",
        opcoes: [
            "A) Going Merry",
            "B) Red Force",
            "C) Thousand Sunny",
            "D) Oro Jackson"
        ],
        resposta: "C"
    },

    {
        pergunta: "Quem é o cozinheiro dos Chapéus de Palha?",
        opcoes: [
            "A) Usopp",
            "B) Sanji",
            "C) Franky",
            "D) Jinbe"
        ],
        resposta: "B"
    },

    {
        pergunta: "Qual é o nome da navegadora dos Chapéus de Palha?",
        opcoes: [
            "A) Robin",
            "B) Vivi",
            "C) Nami",
            "D) Perona"
        ],
        resposta: "C"
    },

    {
        pergunta: "Quem é o médico dos Chapéus de Palha?",
        opcoes: [
            "A) Chopper",
            "B) Law",
            "C) Marco",
            "D) Brook"
        ],
        resposta: "A"
    },

    {
        pergunta: "Qual é o nome do arqueólogo da tripulação?",
        opcoes: [
            "A) Nami",
            "B) Robin",
            "C) Vivi",
            "D) Boa Hancock"
        ],
        resposta: "B"
    },

    {
        pergunta: "Quem é o atirador dos Chapéus de Palha?",
        opcoes: [
            "A) Usopp",
            "B) Franky",
            "C) Sanji",
            "D) Zoro"
        ],
        resposta: "A"
    },

    {
        pergunta: "Qual personagem é conhecido como 'Deus Usopp'?",
        opcoes: [
            "A) Luffy",
            "B) Usopp",
            "C) Brook",
            "D) Franky"
        ],
        resposta: "B"
    },

    {
        pergunta: "Quem treinou Luffy durante o timeskip?",
        opcoes: [
            "A) Shanks",
            "B) Garp",
            "C) Silvers Rayleigh",
            "D) Mihawk"
        ],
        resposta: "C"
    },

    {
        pergunta: "Qual é o nome do irmão de Luffy que era comandante da 2ª divisão dos Piratas do Barba Branca?",
        opcoes: [
            "A) Sabo",
            "B) Ace",
            "C) Law",
            "D) Kid"
        ],
        resposta: "B"
    },

    {
        pergunta: "Quem é conhecido como o 'Cirurgião da Morte'?",
        opcoes: [
            "A) Trafalgar Law",
            "B) Eustass Kid",
            "C) Crocodile",
            "D) Doflamingo"
        ],
        resposta: "A"
    },

    {
        pergunta: "Qual é o nome do espadachim que treinou Zoro?",
        opcoes: [
            "A) Shanks",
            "B) Mihawk",
            "C) Rayleigh",
            "D) Vista"
        ],
        resposta: "B"
    },

    {
        pergunta: "Qual é o nome da ilha onde Luffy treinou durante o timeskip?",
        opcoes: [
            "A) Amazon Lily",
            "B) Rusukaina",
            "C) Wano",
            "D) Zou"
        ],
        resposta: "B"
    },

    {
        pergunta: "Qual personagem usa três espadas?",
        opcoes: [
            "A) Zoro",
            "B) Mihawk",
            "C) Vista",
            "D) Brook"
        ],
        resposta: "A"
    },

    {
        pergunta: "Quem é o capitão dos Piratas do Ruivo?",
        opcoes: [
            "A) Buggy",
            "B) Shanks",
            "C) Teach",
            "D) Kaido"
        ],
        resposta: "B"
    },

    {
        pergunta: "Qual é o nome do navio de Gol D. Roger?",
        opcoes: [
            "A) Oro Jackson",
            "B) Moby Dick",
            "C) Red Force",
            "D) Victoria Punk"
        ],
        resposta: "A"
    },

    {
        pergunta: "Quem possui a Gura Gura no Mi?",
        opcoes: [
            "A) Kaido",
            "B) Barba Negra",
            "C) Barba Branca",
            "D) Shanks"
        ],
        resposta: "C"
    },

    {
        pergunta: "Qual era o apelido de Edward Newgate?",
        opcoes: [
            "A) Barba Negra",
            "B) Barba Branca",
            "C) Barba Ruiva",
            "D) Barba Dourada"
        ],
        resposta: "B"
    },

    {
        pergunta: "Quem é o pai de Luffy?",
        opcoes: [
            "A) Garp",
            "B) Dragon",
            "C) Roger",
            "D) Rayleigh"
        ],
        resposta: "B"
    },

    {
        pergunta: "Quem é o avô de Luffy?",
        opcoes: [
            "A) Monkey D. Garp",
            "B) Monkey D. Dragon",
            "C) Gol D. Roger",
            "D) Sengoku"
        ],
        resposta: "A"
    },

    {
        pergunta: "Qual é o nome do reino onde fica Alabasta?",
        opcoes: [
            "A) Dressrosa",
            "B) Wano",
            "C) Alabasta",
            "D) Goa"
        ],
        resposta: "C"
    },

    {
        pergunta: "Quem era o inimigo principal de Luffy em Alabasta?",
        opcoes: [
            "A) Crocodile",
            "B) Enel",
            "C) Lucci",
            "D) Doflamingo"
        ],
        resposta: "A"
    },

    {
        pergunta: "Qual personagem é conhecido como 'Deus' em Skypiea?",
        opcoes: [
            "A) Enel",
            "B) Eneru",
            "C) Ambos A e B",
            "D) Crocodile"
        ],
        resposta: "C"
    },

    {
        pergunta: "Qual é o nome da ilha dos homens-peixe?",
        opcoes: [
            "A) Zou",
            "B) Fish-Man Island",
            "C) Whole Cake Island",
            "D) Punk Hazard"
        ],
        resposta: "B"
    },

    {
        pergunta: "Quem é o pai de Sanji?",
        opcoes: [
            "A) Judge",
            "B) Zeff",
            "C) King",
            "D) Queen"
        ],
        resposta: "A"
    },

    {
        pergunta: "Qual é o nome do cozinheiro que criou Sanji?",
        opcoes: [
            "A) Judge",
            "B) Zeff",
            "C) Jinbe",
            "D) Ivankov"
        ],
        resposta: "B"
    },

    {
        pergunta: "Qual personagem é um ciborgue?",
        opcoes: [
            "A) Brook",
            "B) Franky",
            "C) Jinbe",
            "D) Chopper"
        ],
        resposta: "B"
    },

    {
        pergunta: "Qual personagem é um esqueleto?",
        opcoes: [
            "A) Brook",
            "B) Franky",
            "C) Brook",
            "D) Gecko Moria"
        ],
        resposta: "A"
    },

    {
        pergunta: "Quem é o timoneiro dos Chapéus de Palha?",
        opcoes: [
            "A) Jinbe",
            "B) Franky",
            "C) Brook",
            "D) Sanji"
        ],
        resposta: "A"
    }
];

function pegarTexto(msg) {

    return (
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        ""
    );
}

function embaralhar(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );
}

function mostrarPergunta(jogo) {

    const p =
        jogo.perguntas[jogo.indice];

    return (
`🏴‍☠️ *QUIZ ONE PIECE* ❓

━━━━━━━━━━━━━━━━━━━━

🎯 *Pergunta ${jogo.indice + 1}/${jogo.perguntas.length}*

${p.pergunta}

${p.opcoes.join("\n")}

━━━━━━━━━━━━━━━━━━━━

💡 Responda:

*!resp A*
*!resp B*
*!resp C*
*!resp D*

⭐ Pontos: ${jogo.pontos}`
    );
}

module.exports = {

    nome: "quiz",
    comando: "quiz",

    executar: async (sock, msg) => {

        const id =
            msg.key.remoteJid;

        const texto =
            pegarTexto(msg).trim();

        const partes =
            texto.split(/\s+/);

        const acao =
            partes[1]?.toLowerCase() || "";


        // ==============================
        // AJUDA
        // ==============================

        if (
            acao === "ajuda" ||
            acao === "help"
        ) {

            return sock.sendMessage(id, {
                text:
`❓ *QUIZ ONE PIECE*

🎮 Comandos:

!quiz
➡️ Começa uma partida

!resp A
!resp B
!resp C
!resp D
➡️ Responde a pergunta

!quiz parar
➡️ Encerra sua partida

🏴‍☠️ Boa sorte, nakama!`
            });
        }


        // ==============================
        // PARAR
        // ==============================

        if (
            acao === "parar" ||
            acao === "sair"
        ) {

            if (!jogos[id]) {

                return sock.sendMessage(id, {
                    text:
`⚠️ Não existe um quiz ativo.

Use:

!quiz`
                });
            }

            delete jogos[id];

            return sock.sendMessage(id, {
                text:
`🏳️ *QUIZ ENCERRADO!*

Até a próxima, nakama! 🏴‍☠️`
            });
        }


        // ==============================
        // INICIAR QUIZ
        // ==============================

        if (acao === "") {

            if (jogos[id]) {

                return sock.sendMessage(id, {
                    text:
`⚠️ *JÁ EXISTE UM QUIZ ATIVO!*

Responda usando:

!resp A
!resp B
!resp C
!resp D`
                });
            }

            jogos[id] = {

                perguntas:
                    embaralhar(perguntas),

                indice: 0,

                pontos: 0,

                acertos: 0,

                erros: 0,

                respondendo: true
            };

            return sock.sendMessage(id, {
                text:
`🏴‍☠️ *QUIZ ONE PIECE* ❓

━━━━━━━━━━━━━━━━━━━━

🔥 *DESAFIO INICIADO!*

Serão feitas várias perguntas.

🎯 Total:
*${perguntas.length} perguntas*

⭐ Cada acerto:
*10 pontos*

━━━━━━━━━━━━━━━━━━━━

Boa sorte, nakama! 🍖

${mostrarPergunta(jogos[id])}`
            });
        }
    }
};


// =====================================
// RESPOSTA
// =====================================

module.exports.responder = async (
    sock,
    msg,
    resposta
) => {

    const id =
        msg.key.remoteJid;

    if (!jogos[id]) {

        return sock.sendMessage(id, {
            text:
`⚠️ *NÃO EXISTE QUIZ ATIVO!*

Comece com:

!quiz`
        });
    }

    const jogo =
        jogos[id];

    resposta =
        String(resposta)
            .trim()
            .toUpperCase();


    if (
        !["A", "B", "C", "D"].includes(
            resposta
        )
    ) {

        return sock.sendMessage(id, {
            text:
`❌ Resposta inválida!

Use:

!resp A
!resp B
!resp C
!resp D`
        });
    }


    const pergunta =
        jogo.perguntas[jogo.indice];


    if (
        resposta === pergunta.resposta
    ) {

        jogo.pontos += 10;
        jogo.acertos++;

        jogo.indice++;


        if (
            jogo.indice >=
            jogo.perguntas.length
        ) {

            const porcentagem =
                Math.round(
                    (
                        jogo.acertos /
                        jogo.perguntas.length
                    ) * 100
                );

            const resultado =
`🏆 *QUIZ FINALIZADO!*
🏴‍☠️🍖

━━━━━━━━━━━━━━━━━━━━

🎯 Resultado:

✅ Acertos:
*${jogo.acertos}*

❌ Erros:
*${jogo.erros}*

⭐ Pontuação:
*${jogo.pontos}*

📊 Aproveitamento:
*${porcentagem}%*

━━━━━━━━━━━━━━━━━━━━

${porcentagem >= 80
    ? "🔥 Você é um verdadeiro nakama!"
    : porcentagem >= 50
        ? "😎 Mandou bem!"
        : "😂 Precisa estudar mais One Piece!"}

🏴‍☠️ *O MAR DA GRAND LINE TE ESPERA!*`;

            delete jogos[id];

            return sock.sendMessage(id, {
                text: resultado
            });
        }


        return sock.sendMessage(id, {
            text:
`✅ *RESPOSTA CERTA!*

🔥 +10 pontos!

⭐ Total:
*${jogo.pontos}*

${mostrarPergunta(jogo)}`
        });
    }


    jogo.erros++;
    jogo.indice++;


    if (
        jogo.indice >=
        jogo.perguntas.length
    ) {

        const porcentagem =
            Math.round(
                (
                    jogo.acertos /
                    jogo.perguntas.length
                ) * 100
            );

        delete jogos[id];

        return sock.sendMessage(id, {
            text:
`❌ *RESPOSTA ERRADA!*

━━━━━━━━━━━━━━━━━━━━

🏁 *QUIZ FINALIZADO!*

✅ Acertos:
*${jogo.acertos}*

❌ Erros:
*${jogo.erros}*

⭐ Pontos:
*${jogo.pontos}*

📊 Aproveitamento:
*${porcentagem}%*`
        });
    }


    return sock.sendMessage(id, {
        text:
`❌ *RESPOSTA ERRADA!*

A resposta correta era:

*${pergunta.resposta}*

━━━━━━━━━━━━━━━━━━━━

🎯 Próxima pergunta:

${mostrarPergunta(jogo)}`
    });
};
