let jogos = {};

const CORES = ["🔴", "🔵", "🟢", "🟡"];

const VALORES = [
    "0", "1", "2", "3", "4", "5",
    "6", "7", "8", "9",
    "⏭️", "🔄", "+2"
];

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function criarBaralho() {
    let baralho = [];

    for (const cor of CORES) {
        for (const valor of VALORES) {
            baralho.push({
                cor,
                valor
            });
        }
    }

    // Coringas
    for (let i = 0; i < 4; i++) {
        baralho.push({
            cor: "🌈",
            valor: "Coringa"
        });

        baralho.push({
            cor: "🌈",
            valor: "+4"
        });
    }

    return embaralhar(baralho);
}

function cartaTexto(carta) {
    return `${carta.cor} ${carta.valor}`;
}

function nomeUsuario(usuario) {
    return `@${usuario.split("@")[0]}`;
}

function mostrarMao(mao) {
    if (!mao || mao.length === 0) {
        return "🎴 Sua mão está vazia!";
    }

    return mao
        .map((carta, i) => `${i + 1}. ${cartaTexto(carta)}`)
        .join("\n");
}

function podeJogar(carta, mesa) {
    if (carta.cor === "🌈") return true;

    if (mesa.cor === "🌈") return true;

    return (
        carta.cor === mesa.cor ||
        carta.valor === mesa.valor
    );
}

function proximoTurno(jogo) {
    jogo.turno++;

    if (jogo.turno >= jogo.jogadores.length) {
        jogo.turno = 0;
    }
}

function jogadorAtual(jogo) {
    return jogo.jogadores[jogo.turno];
}

async function enviarEstado(sock, id, jogo, extra = "") {

    const jogador = jogadorAtual(jogo);

    await sock.sendMessage(id, {
        text:
`${extra}

🃏 *UNO DA GRAND LINE* 🏴‍☠️
━━━━━━━━━━━━━━━━━━━━

🎴 Mesa:
${cartaTexto(jogo.mesa)}

👤 Vez de:
${nomeUsuario(jogador)}

👥 Jogadores:
${jogo.jogadores.length}

━━━━━━━━━━━━━━━━━━━━

Comandos:

!uno mao
!uno jogar número
!uno comprar
!uno desistir`,
        mentions: [jogador]
    });
}

module.exports = {

    nome: "uno",
    comando: "uno",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;

        const usuario =
            msg.key.participant || id;

        const texto =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "";

        const comando =
            texto
                .replace(/^!uno/i, "")
                .trim()
                .toLowerCase();


        // ==========================================
        // AJUDA
        // ==========================================

        if (
            !comando ||
            comando === "ajuda" ||
            comando === "help"
        ) {

            return sock.sendMessage(id, {
                text:
`🃏 *UNO DA GRAND LINE* 🏴‍☠️
━━━━━━━━━━━━━━━━━━━━

🎮 *COMANDOS*

!uno criar
Criar uma partida.

!uno entrar
Entrar na partida.

!uno iniciar
Começar o jogo.

!uno mao
Ver suas cartas.

!uno jogar número
Jogar uma carta.

!uno comprar
Comprar uma carta.

!uno desistir
Sair da partida.

━━━━━━━━━━━━━━━━━━━━

👥 Máximo:
4 jogadores

🎴 Cada jogador começa:
7 cartas`
            });
        }


        // ==========================================
        // CRIAR
        // ==========================================

        if (comando === "criar") {

            if (jogos[id]) {

                return sock.sendMessage(id, {
                    text:
`⚠️ *JÁ EXISTE UMA PARTIDA!*

Use:

!uno entrar`
                });
            }

            jogos[id] = {

                jogadores: [usuario],

                cartas: {},

                baralho: [],

                mesa: null,

                turno: 0,

                iniciado: false,

                sentido: 1
            };

            return sock.sendMessage(id, {
                text:
`🃏 *UNO DA GRAND LINE* 🏴‍☠️
━━━━━━━━━━━━━━━━━━━━

🔥 *PARTIDA CRIADA!*

👑 Criador:
${nomeUsuario(usuario)}

👥 Jogadores:
1/4

━━━━━━━━━━━━━━━━━━━━

Para entrar:

!uno entrar

Quando tiver jogadores:

!uno iniciar`,
                mentions: [usuario]
            });
        }


        // ==========================================
        // ENTRAR
        // ==========================================

        if (comando === "entrar") {

            const jogo = jogos[id];

            if (!jogo) {

                return sock.sendMessage(id, {
                    text:
`⚠️ Nenhuma partida encontrada.

Use:

!uno criar`
                });
            }

            if (jogo.iniciado) {

                return sock.sendMessage(id, {
                    text:
"⚠️ A partida já começou!"
                });
            }

            if (
                jogo.jogadores.includes(usuario)
            ) {

                return sock.sendMessage(id, {
                    text:
"⚠️ Você já está na partida!"
                });
            }

            if (jogo.jogadores.length >= 4) {

                return sock.sendMessage(id, {
                    text:
"❌ A partida já está cheia! (4/4)"
                });
            }

            jogo.jogadores.push(usuario);

            return sock.sendMessage(id, {
                text:
`🏴‍☠️ *NOVO NAKAMA!*

👤 ${nomeUsuario(usuario)}

👥 Jogadores:
${jogo.jogadores.length}/4

Quando estiverem prontos:

!uno iniciar`,
                mentions: [usuario]
            });
        }


        // ==========================================
        // INICIAR
        // ==========================================

        if (comando === "iniciar") {

            const jogo = jogos[id];

            if (!jogo) {

                return sock.sendMessage(id, {
                    text:
"⚠️ Nenhuma partida criada."
                });
            }

            if (jogo.iniciado) {

                return sock.sendMessage(id, {
                    text:
"⚠️ O UNO já começou!"
                });
            }

            if (jogo.jogadores.length < 2) {

                return sock.sendMessage(id, {
                    text:
`⚠️ São necessários pelo menos *2 jogadores*.

👥 Atualmente:
${jogo.jogadores.length}/4`
                });
            }

            jogo.baralho =
                criarBaralho();

            jogo.cartas = {};

            // Distribui 7 cartas
            for (
                const jogador of jogo.jogadores
            ) {

                jogo.cartas[jogador] = [];

                for (let i = 0; i < 7; i++) {

                    jogo.cartas[jogador].push(
                        jogo.baralho.pop()
                    );
                }
            }

            // Primeira carta não pode ser coringa
            let cartaInicial;

            do {

                cartaInicial =
                    jogo.baralho.pop();

            } while (
                cartaInicial.cor === "🌈"
            );

            jogo.mesa = cartaInicial;

            jogo.turno = 0;

            jogo.iniciado = true;

            const primeiro =
                jogadorAtual(jogo);

            await sock.sendMessage(id, {
                text:
`🔥 *UNO INICIADO!* 🏴‍☠️
━━━━━━━━━━━━━━━━━━━━

🎴 Carta na mesa:

${cartaTexto(jogo.mesa)}

👥 Jogadores:
${jogo.jogadores.length}

👤 Primeiro jogador:

${nomeUsuario(primeiro)}

━━━━━━━━━━━━━━━━━━━━

Use:

!uno mao

para ver suas cartas.`,
                mentions: [primeiro]
            });

            return;
        }


        const jogo = jogos[id];


        // ==========================================
        // COMANDOS QUE PRECISAM DE PARTIDA
        // ==========================================

        if (!jogo) {

            return sock.sendMessage(id, {
                text:
`⚠️ *NENHUMA PARTIDA!*

Use:

!uno criar`
            });
        }


        // ==========================================
        // DESISTIR
        // ==========================================

        if (
            comando === "desistir" ||
            comando === "sair"
        ) {

            if (
                !jogo.jogadores.includes(usuario)
            ) {

                return;
            }

            jogo.jogadores =
                jogo.jogadores.filter(
                    p => p !== usuario
                );

            delete jogo.cartas[usuario];

            if (
                jogo.jogadores.length === 0
            ) {

                delete jogos[id];

                return sock.sendMessage(id, {
                    text:
"🏴‍☠️ A partida foi encerrada."
                });
            }

            if (
                jogo.turno >=
                jogo.jogadores.length
            ) {
                jogo.turno = 0;
            }

            return sock.sendMessage(id, {
                text:
`🏃 *JOGADOR SAIU!*

${nomeUsuario(usuario)}

👥 Restantes:
${jogo.jogadores.length}`,
                mentions: [usuario]
            });
        }


        // ==========================================
        // MAO
        // ==========================================

        if (
            comando === "mao" ||
            comando === "mão"
        ) {

            if (!jogo.iniciado) {

                return sock.sendMessage(id, {
                    text:
"⚠️ A partida ainda não começou."
                });
            }

            const mao =
                jogo.cartas[usuario];

            if (!mao) {

                return sock.sendMessage(id, {
                    text:
"⚠️ Você não está nessa partida."
                });
            }

            return sock.sendMessage(id, {
                text:
`🎴 *SUA MÃO*

${mostrarMao(mao)}

━━━━━━━━━━━━━━━━━━━━

🎴 Mesa:
${cartaTexto(jogo.mesa)}

👤 Vez de:
${nomeUsuario(jogadorAtual(jogo))}`
            });
        }


        // ==========================================
        // COMPRAR
        // ==========================================

        if (comando === "comprar") {

            if (!jogo.iniciado) {

                return sock.sendMessage(id, {
                    text:
"⚠️ O jogo ainda não começou."
                });
            }

            if (
                jogadorAtual(jogo) !== usuario
            ) {

                return sock.sendMessage(id, {
                    text:
`⏳ *NÃO É SUA VEZ!*

Agora é a vez de:

${nomeUsuario(jogadorAtual(jogo))}`,
                    mentions: [
                        jogadorAtual(jogo)
                    ]
                });
            }

            if (jogo.baralho.length === 0) {

                return sock.sendMessage(id, {
                    text:
"⚠️ O baralho acabou!"
                });
            }

            const carta =
                jogo.baralho.pop();

            jogo.cartas[usuario].push(carta);

            proximoTurno(jogo);

            return enviarEstado(
                sock,
                id,
                jogo,
                `🃏 *VOCÊ COMPROU UMA CARTA!*

${cartaTexto(carta)}`
            );
        }


        // ==========================================
        // JOGAR
        // ==========================================

        if (
            comando.startsWith("jogar")
        ) {

            if (!jogo.iniciado) {

                return sock.sendMessage(id, {
                    text:
"⚠️ O jogo ainda não começou."
                });
            }

            if (
                jogadorAtual(jogo) !== usuario
            ) {

                return sock.sendMessage(id, {
                    text:
`⏳ *NÃO É SUA VEZ!*

Agora é:

${nomeUsuario(jogadorAtual(jogo))}`,
                    mentions: [
                        jogadorAtual(jogo)
                    ]
                });
            }

            const partes =
                comando.split(/\s+/);

            const numero =
                parseInt(partes[1]);

            if (
                isNaN(numero)
            ) {

                return sock.sendMessage(id, {
                    text:
`❌ Escolha o número da carta.

Exemplo:

!uno mao
!uno jogar 3`
                });
            }

            const mao =
                jogo.cartas[usuario];

            const indice =
                numero - 1;

            if (
                indice < 0 ||
                indice >= mao.length
            ) {

                return sock.sendMessage(id, {
                    text:
"❌ Número de carta inválido."
                });
            }

            const carta =
                mao[indice];

            if (
                !podeJogar(
                    carta,
                    jogo.mesa
                )
            ) {

                return sock.sendMessage(id, {
                    text:
`❌ *VOCÊ NÃO PODE JOGAR ESSA CARTA!*

Sua carta:
${cartaTexto(carta)}

Mesa:
${cartaTexto(jogo.mesa)}

A carta precisa ter a mesma cor ou o mesmo valor.`
                });
            }

            mao.splice(indice, 1);

            jogo.mesa = carta;


            // ======================================
            // VITÓRIA
            // ======================================

            if (mao.length === 0) {

                await sock.sendMessage(id, {
                    text:
`🏆 *UNO! VOCÊ VENCEU!* 🏴‍☠️

━━━━━━━━━━━━━━━━━━━━

👑 Vencedor:

${nomeUsuario(usuario)}

🎴 Última carta:
${cartaTexto(carta)}

🍖 A Grand Line foi conquistada!

━━━━━━━━━━━━━━━━━━━━

🏴‍☠️ Fim da partida!`,
                    mentions: [usuario]
                });

                delete jogos[id];

                return;
            }


            // ======================================
            // CARTAS ESPECIAIS
            // ======================================

            let mensagemEspecial = "";


            if (carta.valor === "⏭️") {

                proximoTurno(jogo);

                proximoTurno(jogo);

                mensagemEspecial =
"⏭️ *PULAR!* O próximo jogador perdeu a vez.";

            }

            else if (carta.valor === "🔄") {

                if (
                    jogo.jogadores.length > 2
                ) {

                    jogo.jogadores.reverse();

                    jogo.turno =
                        jogo.jogadores.indexOf(
                            usuario
                        );
                }

                mensagemEspecial =
"🔄 *INVERTER!* A direção da partida mudou.";

                proximoTurno(jogo);
            }

            else if (carta.valor === "+2") {

                proximoTurno(jogo);

                const alvo =
                    jogadorAtual(jogo);

                if (jogo.baralho.length > 0) {

                    for (let i = 0; i < 2; i++) {

                        if (
                            jogo.baralho.length
                        ) {

                            jogo.cartas[alvo].push(
                                jogo.baralho.pop()
                            );
                        }
                    }
                }

                mensagemEspecial =
`➕2 *ATAQUE!*

${nomeUsuario(alvo)} comprou 2 cartas!`;

                proximoTurno(jogo);
            }

            else if (carta.valor === "+4") {

                proximoTurno(jogo);

                const alvo =
                    jogadorAtual(jogo);

                for (let i = 0; i < 4; i++) {

                    if (
                        jogo.baralho.length
                    ) {

                        jogo.cartas[alvo].push(
                            jogo.baralho.pop()
                        );
                    }
                }

                mensagemEspecial =
`💥 *+4!*

${nomeUsuario(alvo)} comprou 4 cartas!`;

                proximoTurno(jogo);
            }

            else {

                proximoTurno(jogo);
            }


            return enviarEstado(
                sock,
                id,
                jogo,
                `🃏 *CARTA JOGADA!*

👤 ${nomeUsuario(usuario)}

🎴 ${cartaTexto(carta)}

${mensagemEspecial}`
            );
        }


        // ==========================================
        // COMANDO DESCONHECIDO
        // ==========================================

        return sock.sendMessage(id, {
            text:
`❓ Comando desconhecido.

Use:

!uno ajuda`
        });
    }
};
