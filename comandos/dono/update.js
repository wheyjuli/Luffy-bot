const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

module.exports = {
    nome: "update",
    comando: "update",

    executar: async (sock, msg) => {

        const id = msg.key.remoteJid;
        const raiz = path.resolve(__dirname, "../..");

        await sock.sendMessage(id, {
            text:
`╭━━〔 🔄 LUFFY UPDATE 〕━━⬣

🔍 Iniciando diagnóstico...

🏴‍☠️ Vou verificar o Luffy Bot
sem substituir seus comandos.

⏳ Aguarde...`
        });

        const resultado = {
            arquivos: 0,
            funcionando: 0,
            erros: [],
            avisos: [],
            duplicados: [],
            dependencias: []
        };

        // ==============================
        // 1. VERIFICAR COMANDOS
        // ==============================

        const pastaComandos =
            path.join(raiz, "comandos");

        const arquivos =
            encontrarJS(pastaComandos);

        resultado.arquivos = arquivos.length;

        const nomesComandos = {};

        for (const arquivo of arquivos) {

            try {

                // Limpa o cache para conseguir testar
                // o arquivo novamente.
                delete require.cache[
                    require.resolve(arquivo)
                ];

                const comando =
                    require(arquivo);

                if (
                    !comando ||
                    typeof comando !== "object"
                ) {

                    resultado.erros.push(
                        `${arquivo}: exportação inválida`
                    );

                    continue;
                }

                if (!comando.comando) {

                    resultado.avisos.push(
                        `${arquivo}: sem "comando"`
                    );

                } else {

                    const nome =
                        String(comando.comando)
                            .toLowerCase();

                    if (nomesComandos[nome]) {

                        resultado.duplicados.push(
                            `${nome}: ${nomesComandos[nome]} ↔ ${arquivo}`
                        );

                    } else {

                        nomesComandos[nome] =
                            arquivo;

                    }

                }

                if (
                    typeof comando.executar !==
                    "function"
                ) {

                    resultado.erros.push(
                        `${arquivo}: sem função executar()`
                    );

                    continue;
                }

                resultado.funcionando++;

            } catch (erro) {

                resultado.erros.push(
                    `${arquivo}: ${erro.message}`
                );

            }

        }

        // ==============================
        // 2. VERIFICAR PACKAGE.JSON
        // ==============================

        const packageFile =
            path.join(raiz, "package.json");

        if (fs.existsSync(packageFile)) {

            try {

                const pkg =
                    JSON.parse(
                        fs.readFileSync(
                            packageFile,
                            "utf8"
                        )
                    );

                const dependencias = {
                    ...(pkg.dependencies || {}),
                    ...(pkg.devDependencies || {})
                };

                for (
                    const nome of Object.keys(dependencias)
                ) {

                    try {

                        require.resolve(
                            nome,
                            {
                                paths: [raiz]
                            }
                        );

                    } catch (e) {

                        resultado.dependencias.push(
                            nome
                        );

                    }

                }

            } catch (erro) {

                resultado.erros.push(
                    `package.json: ${erro.message}`
                );

            }

        } else {

            resultado.avisos.push(
                "package.json não encontrado"
            );

        }

        // ==============================
        // 3. LIMPEZA SEGURA
        // ==============================

        const temporarios = [
            "musica.mp3",
            "play2.mp4",
            "ytmp3.mp3",
            "capa.jpg"
        ];

        let limpos = 0;

        for (const arquivo of temporarios) {

            const caminho =
                path.join(raiz, arquivo);

            if (fs.existsSync(caminho)) {

                try {

                    fs.unlinkSync(caminho);

                    limpos++;

                } catch (e) {}

            }

        }

        // ==============================
        // 4. RECARREGAR COMANDOS
        // ==============================

        let totalRecarregado = 0;

        try {

            const categorias =
                fs.readdirSync(
                    pastaComandos
                );

            for (const categoria of categorias) {

                const pasta =
                    path.join(
                        pastaComandos,
                        categoria
                    );

                if (!fs.existsSync(pasta)) {
                    continue;
                }

                if (
                    !fs.statSync(pasta).isDirectory()
                ) {
                    continue;
                }

                const arquivosCategoria =
                    fs.readdirSync(pasta);

                for (
                    const arquivo
                    of arquivosCategoria
                ) {

                    if (
                        !arquivo.endsWith(".js")
                    ) {
                        continue;
                    }

                    try {

                        const caminho =
                            path.join(
                                pasta,
                                arquivo
                            );

                        delete require.cache[
                            require.resolve(caminho)
                        ];

                        require(caminho);

                        totalRecarregado++;

                    } catch (e) {

                        // Já foi registrado
                        // no diagnóstico.

                    }

                }

            }

        } catch (erro) {

            resultado.erros.push(
                `Recarregamento: ${erro.message}`
            );

        }

        // ==============================
        // 5. MONTAR RELATÓRIO
        // ==============================

        let relatorio =
`╭━━〔 🔄 LUFFY UPDATE 〕━━⬣

📦 Arquivos analisados:
${resultado.arquivos}

🟢 Comandos carregáveis:
${resultado.funcionando}

🔁 Comandos recarregados:
${totalRecarregado}

🧹 Temporários removidos:
${limpos}`;

        if (resultado.duplicados.length > 0) {

            relatorio +=
`\n\n🔁 *DUPLICADOS:*`;

            for (
                const erro
                of resultado.duplicados.slice(0, 5)
            ) {

                relatorio +=
                    `\n⚠️ ${erro}`;

            }

        }

        if (resultado.avisos.length > 0) {

            relatorio +=
`\n\n⚠️ *AVISOS:*`;

            for (
                const aviso
                of resultado.avisos.slice(0, 5)
            ) {

                relatorio +=
                    `\n• ${aviso}`;

            }

        }

        if (resultado.erros.length > 0) {

            relatorio +=
`\n\n🔴 *ERROS ENCONTRADOS:*`;

            for (
                const erro
                of resultado.erros.slice(0, 5)
            ) {

                relatorio +=
                    `\n• ${erro}`;

            }

        }

        if (resultado.dependencias.length > 0) {

            relatorio +=
`\n\n📦 *DEPENDÊNCIAS AUSENTES:*`;

            for (
                const dep
                of resultado.dependencias.slice(0, 10)
            ) {

                relatorio +=
                    `\n• ${dep}`;

            }

        }

        // ==============================
        // STATUS
        // ==============================

        const critico =
            resultado.erros.length > 0;

        if (critico) {

            relatorio +=
`\n\n🔴 *STATUS:* Foram encontrados erros.

🛡️ O Luffy Bot NÃO será reiniciado automaticamente para evitar derrubar uma sessão funcionando.

🔧 Corrija os erros acima e execute:
!update`;

        } else {

            relatorio +=
`\n\n🟢 *STATUS:* Sistema saudável.

🏴‍☠️ Diagnóstico concluído!`;

        }

        relatorio +=
`\n╰━━━━━━━━━━━━━━━━━━━━⬣`;

        await sock.sendMessage(id, {
            text: relatorio
        });

        // ==============================
        // 6. REINÍCIO SEGURO
        // ==============================

        if (!critico) {

            await new Promise(
                resolve =>
                    setTimeout(resolve, 1500)
            );

            await sock.sendMessage(id, {
                text:
`🔄 *Reiniciando Luffy Bot...*

🏴‍☠️ Até logo, pirata!
⚓ Voltando em alguns segundos...`
            });

            await new Promise(
                resolve =>
                    setTimeout(resolve, 1000)
            );

            /*
             * NÃO usamos start.sh aqui.
             *
             * O processo atual será encerrado.
             * Se seu start.sh estiver usando
             * um loop de reinício, ele inicia
             * o bot novamente.
             */

            process.exit(0);

        }

    }
};


// =====================================
// ENCONTRAR TODOS OS JS
// =====================================

function encontrarJS(pasta) {

    let resultado = [];

    if (!fs.existsSync(pasta)) {
        return resultado;
    }

    const itens =
        fs.readdirSync(pasta);

    for (const item of itens) {

        const caminho =
            path.join(pasta, item);

        try {

            const stat =
                fs.statSync(caminho);

            if (stat.isDirectory()) {

                resultado =
                    resultado.concat(
                        encontrarJS(caminho)
                    );

            } else if (
                stat.isFile() &&
                item.endsWith(".js")
            ) {

                resultado.push(caminho);

            }

        } catch (e) {}

    }

    return resultado;
}
