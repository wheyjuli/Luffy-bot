// 🏴‍☠️ LUFFY BOT
// 🎭 EU NUNCA - versão melhorada

const jogos = {};

const perguntas = [

    // 😂 DIVERSÃO
    "Eu nunca ri em uma situação em que não podia rir. 😂",
    "Eu nunca tropecei em público e fingi que nada aconteceu. 😂",
    "Eu nunca falei sozinho. 😂",
    "Eu nunca dancei quando ninguém estava olhando. 💃",
    "Eu nunca cantei no chuveiro. 🎤",
    "Eu nunca fiz uma careta para o espelho. 😂",
    "Eu nunca imaginei uma discussão e ganhei nela. 😂",
    "Eu nunca fiquei rindo sozinho lembrando de alguma coisa. 😂",
    "Eu nunca imitei alguém escondido. 😂",
    "Eu nunca inventei uma história na minha cabeça. 🤣",

    // 📱 CELULAR
    "Eu nunca visualizei uma mensagem e esqueci de responder. 📱",
    "Eu nunca mandei mensagem para a pessoa errada. 📱😂",
    "Eu nunca tirei print de uma conversa. 📸",
    "Eu nunca apaguei uma mensagem porque me arrependi. 🗑️",
    "Eu nunca fiquei esperando alguém ficar online. 👀",
    "Eu nunca fiquei olhando o perfil de alguém por curiosidade. 👀",
    "Eu nunca pesquisei alguém nas redes sociais. 🔎",
    "Eu nunca fiquei com vergonha de curtir uma foto antiga. 😳",
    "Eu nunca bloqueei alguém e depois desbloqueei. 📱",
    "Eu nunca mandei uma figurinha no momento errado. 😂",

    // ❤️ RELACIONAMENTOS
    "Eu nunca tive uma paixão secreta. ❤️",
    "Eu nunca gostei de alguém que não sabia disso. 👀",
    "Eu nunca fiquei com ciúmes sem admitir. 😶",
    "Eu nunca fiquei esperando uma mensagem de alguém específico. 📱❤️",
    "Eu nunca fiquei nervoso esperando uma resposta. 😰",
    "Eu nunca reli uma conversa antiga. 💭",
    "Eu nunca ensaiei uma conversa antes de falar com alguém. 😅",
    "Eu nunca fiquei feliz só porque uma determinada pessoa mandou mensagem. ❤️",
    "Eu nunca escondi que estava gostando de alguém. 👀",
    "Eu nunca tive vergonha de admitir que gostava de alguém. 🫣",

    // 📚 ESCOLA
    "Eu nunca dormi durante uma aula. 😴",
    "Eu nunca fiz uma tarefa em cima da hora. ⏰",
    "Eu nunca estudei minutos antes da prova. 📚",
    "Eu nunca esqueci de fazer uma tarefa. 😭",
    "Eu nunca fiquei olhando o relógio esperando a aula acabar. ⏰",
    "Eu nunca comemorei quando uma aula foi cancelada. 😂",
    "Eu nunca esqueci o material em casa. 🎒",
    "Eu nunca fiquei conversando quando deveria prestar atenção. 😂",
    "Eu nunca fiquei nervoso antes de uma apresentação. 😰",
    "Eu nunca esqueci o que ia falar durante uma apresentação. 😂",

    // 🍕 COMIDA
    "Eu nunca comi pizza no café da manhã. 🍕",
    "Eu nunca comi sobremesa antes da comida. 🍰",
    "Eu nunca comi de madrugada. 🌙",
    "Eu nunca escondi comida para ninguém pegar. 😂",
    "Eu nunca comi o último pedaço sem perguntar. 🍕",
    "Eu nunca roubei comida do prato de alguém. 🍟",
    "Eu nunca abri a geladeira sem saber o que queria. 😂",
    "Eu nunca pedi comida só porque estava com preguiça de cozinhar. 🍔",
    "Eu nunca comi algo que caiu no chão. 😂",
    "Eu nunca fiquei com fome logo depois de comer. 🤣",

    // 🎮 JOGOS
    "Eu nunca fiquei acordado até tarde jogando. 🎮",
    "Eu nunca fiquei bravo porque perdi uma partida. 😡",
    "Eu nunca culpei o jogo por perder. 😂",
    "Eu nunca comemorei uma vitória como se fosse campeonato. 🏆",
    "Eu nunca joguei escondido quando deveria estar fazendo outra coisa. 😂",
    "Eu nunca falei 'última partida' e joguei mais dez. 🎮",
    "Eu nunca abandonei uma partida por raiva. 😤",
    "Eu nunca fiquei horas jogando sem perceber o tempo. ⏰",
    "Eu nunca fiquei competitivo demais em um jogo. 😂",
    "Eu nunca comemorei quando um adversário saiu da partida. 😂",

    // 😳 VERGONHA
    "Eu nunca passei vergonha na frente de várias pessoas. 😳",
    "Eu nunca chamei alguém pelo nome errado. 😂",
    "Eu nunca acenei para alguém que não estava acenando para mim. 😭",
    "Eu nunca tropecei na frente de alguém que eu queria impressionar. 😂",
    "Eu nunca falei alguma coisa e me arrependi imediatamente. 🫣",
    "Eu nunca mandei áudio e fiquei com vergonha depois. 🎤",
    "Eu nunca entrei em um lugar errado achando que era outro. 😂",
    "Eu nunca ri em um momento completamente errado. 😭",
    "Eu nunca fiquei sem saber o que responder. 🫣",
    "Eu nunca fingi que sabia alguma coisa quando não sabia. 😂",

    // 🏠 VIDA
    "Eu nunca menti dizendo que estava chegando quando ainda estava em casa. 😂",
    "Eu nunca fingi estar dormindo para não responder alguém. 😴",
    "Eu nunca fiquei acordado até tarde sem motivo. 🌙",
    "Eu nunca perdi algo e encontrei no lugar mais óbvio. 😂",
    "Eu nunca esqueci onde coloquei meu celular enquanto estava segurando ele. 📱",
    "Eu nunca fiquei horas mexendo no celular. 📱",
    "Eu nunca adiei alguma coisa até o último momento. ⏰",
    "Eu nunca inventei uma desculpa para não sair. 😅",
    "Eu nunca fiquei com preguiça de responder alguém. 😂",
    "Eu nunca comecei uma coisa e abandonei depois. 😭",

    // 👀 SEGREDOS
    "Eu nunca escondi alguma coisa para não levar bronca. 👀",
    "Eu nunca menti para escapar de uma situação. 😅",
    "Eu nunca fingi que não sabia de alguma coisa. 👀",
    "Eu nunca descobri um segredo sem querer. 🤫",
    "Eu nunca ouvi uma conversa escondido. 👂",
    "Eu nunca fiquei curioso sobre uma conversa que não era comigo. 👀",
    "Eu nunca contei um segredo sem querer. 😭",
    "Eu nunca guardei um segredo por muito tempo. 🤐",
    "Eu nunca inventei uma desculpa para escapar de uma situação. 😂",
    "Eu nunca escondi que estava com ciúmes. 👀"
];


// ======================================================
// COMANDO
// ======================================================

module.exports = {

    nome: "eununca",
    comando: "eununca",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;

        const texto =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        const partes = texto.trim().split(/\s+/);

        const acao =
            partes[1]?.toLowerCase() || "";

        const nome =
            msg.pushName ||
            "Jogador";

        // ==================================================
        // AJUDA
        // ==================================================

        if (acao === "ajuda") {

            return sock.sendMessage(id, {
                text:
`🎭 *EU NUNCA — COMANDOS*

━━━━━━━━━━━━━━━━

▶️ *Iniciar*
!eununca

👤 *Entrar*
!eununca entrar

🎲 *Nova rodada*
!eununca proximo

📊 *Placar*
!eununca placar

👥 *Jogadores*
!eununca jogadores

🛑 *Encerrar*
!eununca parar

━━━━━━━━━━━━━━━━

🏴‍☠️ Divirta-se com a tripulação!`
            });
        }


        // ==================================================
        // PARAR
        // ==================================================

        if (
            acao === "parar" ||
            acao === "sair" ||
            acao === "stop"
        ) {

            if (!jogos[id]) {

                return sock.sendMessage(id, {
                    text:
`⚠️ *NENHUM JOGO ATIVO!*

Use:
!eununca`
                });
            }

            delete jogos[id];

            return sock.sendMessage(id, {
                text:
`🛑 *EU NUNCA ENCERRADO!*

🏴‍☠️ A tripulação foi dispensada!`
            });
        }


        // ==================================================
        // INICIAR
        // ==================================================

        if (!jogos[id]) {

            jogos[id] = {

                rodada: 0,

                usadas: [],

                jogadores: {},

                criadoPor: nome

            };

            jogos[id].jogadores[nome] = 0;

            await sock.sendMessage(id, {
                text:
`🏴‍☠️ *EU NUNCA*
━━━━━━━━━━━━━━━━

🎭 O jogo começou!

👑 Criado por:
*${nome}*

👥 Para participar:
*!eununca entrar*

🎲 Para jogar:
*!eununca proximo*

📊 Placar:
*!eununca placar*

━━━━━━━━━━━━━━━━`
            });

            return enviarPergunta(sock, id);
        }


        const jogo = jogos[id];


        // ==================================================
        // ENTRAR
        // ==================================================

        if (acao === "entrar") {

            if (jogo.jogadores[nome] !== undefined) {

                return sock.sendMessage(id, {
                    text:
`👀 *${nome}*, você já está participando!`
                });
            }

            jogo.jogadores[nome] = 0;

            return sock.sendMessage(id, {
                text:
`✅ *${nome} entrou no jogo!*

👥 Jogadores: ${Object.keys(jogo.jogadores).length}`
            });
        }


        // ==================================================
        // JOGADORES
        // ==================================================

        if (acao === "jogadores") {

            const lista =
                Object.keys(jogo.jogadores);

            return sock.sendMessage(id, {
                text:
`👥 *JOGADORES*

━━━━━━━━━━━━━━━━

${lista.map((p, i) =>
`${i + 1}. ${p}`
).join("\n")}

━━━━━━━━━━━━━━━━

Total: *${lista.length}*`
            });
        }


        // ==================================================
        // PLACAR
        // ==================================================

        if (acao === "placar") {

            const ranking =
                Object.entries(jogo.jogadores)
                    .sort((a, b) => b[1] - a[1]);

            return sock.sendMessage(id, {
                text:
`🏆 *PLACAR — EU NUNCA*

━━━━━━━━━━━━━━━━

${ranking.map(
    ([p, pontos], i) =>
`${i + 1}. *${p}* — ${pontos} ponto(s)`
).join("\n")}

━━━━━━━━━━━━━━━━
🎭 Rodada: *${jogo.rodada}*`
            });
        }


        // ==================================================
        // PRÓXIMA
        // ==================================================

        if (
            acao === "proximo" ||
            acao === "next"
        ) {

            return enviarPergunta(sock, id);
        }


        // ==================================================
        // PADRÃO
        // ==================================================

        return enviarPergunta(sock, id);
    }
};


// ======================================================
// PERGUNTA
// ======================================================

async function enviarPergunta(sock, id) {

    const jogo = jogos[id];

    if (!jogo) return;


    // Se acabou tudo
    if (jogo.usadas.length >= perguntas.length) {

        jogo.usadas = [];

    }


    let indice;


    do {

        indice =
            Math.floor(
                Math.random() *
                perguntas.length
            );

    } while (
        jogo.usadas.includes(indice)
    );


    jogo.usadas.push(indice);

    jogo.rodada++;


    const pergunta =
        perguntas[indice];


    await sock.sendMessage(id, {
        text:
`🎭 *EU NUNCA*
━━━━━━━━━━━━━━━━

🔥 *RODADA ${jogo.rodada}*

👉 ${pergunta}

━━━━━━━━━━━━━━━━

🙋 Quem já fez isso,
*admite!*

🎲 Próxima:
*!eununca proximo*

👥 Entrar:
*!eununca entrar*

📊 Placar:
*!eununca placar*

🛑 Parar:
*!eununca parar*

━━━━━━━━━━━━━━━━
🏴‍☠️ *Luffy Bot*`
    });
}
