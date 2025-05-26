const chalk = require('chalk');

const {
  gerarChaveSimetrica,
  criptografarSimetrico,
  descriptografarSimetrico,
  gerarChavesAssimetricas,
  criptografarAssimetrica,
  descriptografarAssimetrica
} = require('./criptografia.js'); 

console.log(chalk.bold.bgBlue.white("\n=== Demonstração de Criptografia Híbrida (Alice e Bob) ===\n"));

// =====================================================================
// ETAPA 1: PREPARAÇÃO DO RECEPTOR (BOB)
// Bob gera suas chaves assimétricas (pública e privada).
// A chave pública pode ser compartilhada, a privada JAMAIS!
// =====================================================================
console.log(chalk.blue("--- ETAPA 1: Preparação do Receptor (Bob) ---"));

const { chavePublica: chavePublicaBob, chavePrivada: chavePrivadaBob } = gerarChavesAssimetricas();
console.log("🔐 Bob gera seu par de chaves assimétricas:");
console.log("   - Chave Pública de Bob (para criptografar PARA ele):" , chavePublicaBob);
console.log("   - Chave Privada de Bob (só ele tem, para descriptografar):", chavePrivadaBob);
console.log("   Bob compartilha sua Chave Pública com Alice (e com quem quiser enviar algo para ele).");

// =====================================================================
// ETAPA 2: ALICE QUER ENVIAR UMA MENSAGEM
// Alice prepara a mensagem e a chave para a comunicação.
// =====================================================================
console.log("\n--- ETAPA 2: Alice Prepara a Mensagem ---");

const mensagemAlice = "Oi Bob, to enviando os relatórios de pagamento da empresa.";
console.log("👩 Mensagem original que Alice quer enviar: ", chalk.green(`"${mensagemAlice}"`));

// =====================================================================
// ETAPA 3: ALICE GERA UMA CHAVE SIMÉTRICA (CHAVE DE SESSÃO)
// Essa chave será usada para criptografar a mensagem original por ser rápida.
// =====================================================================
console.log(chalk.blue("\n--- ETAPA 3: Alice Gera a Chave de Sessão (Simétrica) ---"));

const chaveSimetricaAlice = gerarChaveSimetrica();
console.log("🔑 Alice gera uma nova Chave Simétrica temporária (Chave de Sessão):", chalk.yellow(chaveSimetricaAlice));

// =====================================================================
// ETAPA 4: ALICE CRIPTOGRAFA A MENSAGEM COM A CHAVE SIMÉTRICA
// =====================================================================
console.log(chalk.blue("\n--- ETAPA 4: Alice Criptografa a Mensagem original ---"));

const mensagemCriptografada = criptografarSimetrico(mensagemAlice, chaveSimetricaAlice);
console.log("🔒 Alice criptografa a mensagem original usando a Chave Simétrica:", chalk.blue(mensagemCriptografada));
console.log("   A mensagem agora está ilegível para quem não tiver a Chave Simétrica.");

// =====================================================================
// ETAPA 5: ALICE CRIPTOGRAFA A CHAVE SIMÉTRICA COM A CHAVE PÚBLICA DE BOB
// Isso garante que SÓ BOB poderá obter a chave simétrica.
// =====================================================================
console.log(chalk.blue("\n--- ETAPA 5: Alice Protege a Chave de Sessão ---"));

const chaveSimetricaCriptografada = criptografarAssimetrica(String(chaveSimetricaAlice), chavePublicaBob);
console.log(chalk.green("🗝️ Alice criptografa a Chave Simétrica (") + chalk.yellow(chaveSimetricaAlice) + chalk.green(") usando a Chave Pública de Bob:"), chalk.magenta(chaveSimetricaCriptografada));

// =====================================================================
// ETAPA 6: ALICE ENVIA PARA BOB
// =====================================================================
console.log(chalk.bold.blue("\n--- ETAPA 6: Alice Envia os Dados ---"));
console.log("📦 Alice envia para Bob (através de um canal potencialmente inseguro):");
console.log("   - Mensagem criptografada (simétrica):", chalk.blue(mensagemCriptografada));
console.log("   - Chave Simétrica criptografada (assimétrica):", chalk.magenta(chaveSimetricaCriptografada));

// =====================================================================
// ETAPA 7: BOB RECEBE E DESCRIPTOGRAFA A CHAVE SIMÉTRICA
// Bob usa sua chave privada (que só ele tem) para obter a chave simétrica.
// =====================================================================
console.log(chalk.bold.blue("\n--- ETAPA 7: Bob Descriptografa a Chave de Sessão ---"));

console.log("📥 Bob recebe os dados.");
const chaveSimetricaRecebidaStr = descriptografarAssimetrica(chaveSimetricaCriptografada, chavePrivadaBob);
const chaveSimetricaRecebida = parseInt(chaveSimetricaRecebidaStr);
console.log("🗝️ Bob usa sua Chave Privada (🔒) para descriptografar a Chave Simétrica:", chalk.yellow(chaveSimetricaRecebida));

// =====================================================================
// ETAPA 8: BOB DESCRIPTOGRAFA A MENSAGEM COM A CHAVE SIMÉTRICA
// Agora que Bob tem a chave, ele pode ler a mensagem.
// =====================================================================
console.log(chalk.bold.blue("\n--- ETAPA 8: Bob Descriptografa a Mensagem original ---"));

const mensagemRecebida = descriptografarSimetrico(mensagemCriptografada, chaveSimetricaRecebida);
console.log("✅ Bob usa a Chave Simétrica recuperada para descriptografar a mensagem: ", chalk.green(`"${mensagemRecebida}"`));
console.log("   Mensagem lida com sucesso e segurança!");

// =====================================================================
// O QUE UM ATACANTE (bisbilhoteiro) VERIA E POR QUE A SEGURANÇA É MANTIDA
// =====================================================================
console.log(chalk.bold.red("\n--- 👹 O QUE UM ATACANTE (Bisbilhoteiro) VERIA? ---"));

console.log("👹 Bisbilhoteiro (o atacante) interceptou os seguintes dados trafegando na rede:");
console.log("   Mensagem criptografada (simétrica):", chalk.dim(mensagemCriptografada));
console.log("   Chave simétrica criptografada (assimétrica):", chalk.dim(chaveSimetricaCriptografada));

