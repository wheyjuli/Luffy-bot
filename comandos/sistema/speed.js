module.exports = {
    nome: "speed",
    comando: "speed",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;

        const inicio = Date.now();

        const teste = await sock.sendMessage(id, {
            text: "🚀 *Testando velocidade...*"
        });

        const ms = Date.now() - inicio;

        let qualidade;
        let emoji;

        if (ms < 200) {
            qualidade = "Excelente";
            emoji = "🟢";
        } else if (ms < 500) {
            qualidade = "Boa";
            emoji = "🟡";
        } else if (ms < 1000) {
            qualidade = "Regular";
            emoji = "🟠";
        } else {
            qualidade = "Lenta";
            emoji = "🔴";
        }

        const uptime = formatarUptime(process.uptime());

        const comandos =
            typeof global.comandosCarregados === "number"
                ? global.comandosCarregados
                : "N/D";

        await sock.sendMessage(id, {
            text:
`╭━━〔 🚀 LUFFY SPEED 〕━━⬣

⚡ *Latência:* ${ms}ms
${emoji} *Qualidade:* ${qualidade}
🔥 *Status:* Online
🤖 *Bot:* Luffy Bot
📦 *Comandos:* ${comandos}
⏱️ *Uptime:* ${uptime}

🍖 *Luffy:*
"Shishishi! Ainda estou rápido!"

╰━━━━━━━━━━━━━━━━━━━━⬣`
        });

    }
};


function formatarUptime(segundos) {

    segundos = Math.floor(segundos);

    const dias = Math.floor(segundos / 86400);

    segundos %= 86400;

    const horas = Math.floor(segundos / 3600);

    segundos %= 3600;

    const minutos = Math.floor(segundos / 60);

    const seg = segundos % 60;

    let resultado = "";

    if (dias > 0)
        resultado += `${dias}d `;

    if (horas > 0)
        resultado += `${horas}h `;

    if (minutos > 0)
        resultado += `${minutos}m `;

    resultado += `${seg}s`;

    return resultado;
}
