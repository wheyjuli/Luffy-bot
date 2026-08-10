// 💍 CASAR — Luffy Bot
// 🏴‍☠️ Tema One Piece

const locais = [
    "🏝️ Ilha dos Tritões",
    "🏴‍☠️ Thousand Sunny",
    "🌊 Grand Line",
    "🏝️ Dressrosa",
    "🌸 Wano",
    "🏰 Whole Cake Island",
    "🌅 Uma ilha secreta da Grand Line"
];

const padrinhos = [
    "🍖 Luffy",
    "⚔️ Zoro",
    "🍳 Sanji",
    "🦌 Chopper",
    "🌊 Jinbe",
    "🎯 Usopp",
    "💰 Nami",
    "📚 Robin",
    "🎻 Brook",
    "🛠️ Franky"
];

const frases = [
    "😂 O casamento foi quase perfeito... até o Luffy comer o bolo inteiro!",
    "🤣 O padre terminou a cerimônia e o Zoro conseguiu se perder na saída.",
    "🍖 O buffet foi atacado pela tripulação antes dos noivos comerem.",
    "😂 Sanji chorou tanto que quase inundou a cerimônia.",
    "🏴‍☠️ A festa terminou em uma batalha de dança.",
    "🤣 Nami apresentou a conta e todo mundo desapareceu.",
    "🎉 A cerimônia terminou com uma festa gigantesca no Thousand Sunny.",
    "😂 Usopp contou uma história tão absurda que até o padre acreditou.",
    "💥 Um canhão foi disparado para comemorar. Ninguém sabe quem autorizou.",
    "❤️ Todos viveram felizes... pelo menos até a próxima aventura."
];

const votos = [
    "❤️ Prometo dividir minhas aventuras, minhas risadas e até meu último pedaço de carne.",
    "💍 Prometo estar ao seu lado em todas as ilhas da Grand Line.",
    "🏴‍☠️ Prometo navegar com você até o fim do mundo.",
    "😂 Prometo não roubar sua comida... pelo menos não todos os dias.",
    "❤️ Prometo transformar cada aventura em uma memória inesquecível."
];

function aleatorio(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

function extrairTexto(msg) {
    return (
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        ""
    );
}

module.exports = {

    nome: "casar",
    comando: "casar",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;

        const texto = extrairTexto(msg);

        const partes = texto.trim().split(/\s+/);

        // Remove !casar
        partes.shift();

        if (!partes.length) {

            return sock.sendMessage(id, {
                text:
`💍 *CASAMENTO NA GRAND LINE* 🏴‍☠️

Quer casar com alguém? 😂

Digite:

💒 *!casar @pessoa*

Exemplo:
*!casar @amigo*

❤️ Prepare os votos!
🎉 Prepare a festa!
🏴‍☠️ Prepare a tripulação!`
            });
        }

        const mencionado =
            msg.message?.extendedTextMessage?.contextInfo
                ?.mentionedJid?.[0];

        let parceiro;

        if (mencionado) {

            parceiro =
                "@" + mencionado.split("@")[0];

        } else {

            parceiro =
                partes
                    .join(" ")
                    .replace("@", "")
                    .trim();

            if (!parceiro) {
                parceiro = "seu grande amor";
            }
        }

        const autor =
            msg.pushName ||
            "Capitão";

        const local = aleatorio(locais);
        const padrinho = aleatorio(padrinhos);
        const frase = aleatorio(frases);
        const voto = aleatorio(votos);

        const valor =
            Math.floor(
                Math.random() * 900000
            ) + 100000;

        const mensagem =
`💍 *CASAMENTO NA GRAND LINE* 🏴‍☠️
━━━━━━━━━━━━━━━━━━━━

👰 *Noiva/Noivo:* ${parceiro}
🤵 *Par:* ${autor}

━━━━━━━━━━━━━━━━━━━━

📍 *Local:*
${local}

👑 *Padrinho escolhido:*
${padrinho}

💰 *Custo da cerimônia:*
฿ ${valor.toLocaleString("pt-BR")}

━━━━━━━━━━━━━━━━━━━━

💌 *VOTO DO CASAMENTO:*

"${voto}"

━━━━━━━━━━━━━━━━━━━━

💒 *CERIMÔNIA REALIZADA!*

🎉 *CONVIDADOS:*
🏴‍☠️ Tripulação do Chapéu de Palha
🍖 Luffy
⚔️ Zoro
🍳 Sanji
💰 Nami
🎯 Usopp
🦌 Chopper
📚 Robin

━━━━━━━━━━━━━━━━━━━━

${frase}

❤️ *Que viva o casal!*

🏴‍☠️ *E que a aventura continue pela Grand Line!*`;

        const opcoes = {};

        if (mencionado) {
            opcoes.mentions = [mencionado];
        }

        return sock.sendMessage(id, {
            text: mensagem,
            ...opcoes
        });
    }
};
