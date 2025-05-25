const chalk = require('chalk');

const {
  gerarChaveSimetrica,
  criptografarSimetrico,
  descriptografarSimetrico,
  gerarChavesAssimetricas,
  criptografarAssimetrica,
  descriptografarAssimetrica
} = require('./criptografia.js')


// Estratégia Híbrida – Criptografia Simétrica e Assimétrica
console.log("--- Preparação da Ana ---");

// Ana tem suas Chaves de Segredo Seguro (Assimétricas)
// Gera seu par de chaves pública e privada.
const chavesAna = gerarChavesAssimetricas();
const chavePublicaDeAna = chavesAna.chavePublica;
const chavePrivadaDeAna = chavesAna.chavePrivada;

console.log("1. Ana gerou suas chaves assimétricas:");
console.log("   - Chave Pública de Ana (e, n):", chavePublicaDeAna);
console.log("   - Chave Privada de Ana (d, n):", chavePrivadaDeAna);
console.log("Ana compartilha sua Chave Pública com João");

// Funcionamento:
console.log("\n--- Comunicação de João para Ana ---");

// João obtém a Chave Pública de Ana
const chavePublicaDeAnaRecebidaPorJoao = chavePublicaDeAna;
// 1. João Gera uma Chave Secreta (para a Sessão)
// Essa será a chave simétrica usada para criptografar as mensagens.

const chaveSecretaDeSessaoGeradaPorJoao = gerarChaveSimetrica();
console.log("\n1. João gera uma Chave Secreta para a sessão (simétrica):");
console.log("   - Chave Secreta de Sessão de João:", chalk.yellow(chaveSecretaDeSessaoGeradaPorJoao));
const mensagemRealDeJoao = "Olá Ana! Como está as coisas por aí?";

console.log("   - Mensagem que João quer enviar:", chalk.green(mensagemRealDeJoao));
// João criptografa a mensagem real com a chave secreta de sessão (simétrica)
const mensagemRealEnviadaParaAna = criptografarSimetrico(mensagemRealDeJoao, chaveSecretaDeSessaoGeradaPorJoao);
console.log("   - Mensagem real criptografada simetricamente:", chalk.yellow(mensagemRealEnviadaParaAna));

// 2. João Envia a Chave Secreta
// Criptografa a chave secreta de sessão usando a Chave Pública de Ana.
const sessaoCriptografadaAssimetricamente = criptografarAssimetrica(
  chaveSecretaDeSessaoGeradaPorJoao.toString(),
  chavePublicaDeAnaRecebidaPorJoao
);

console.log("\n2. João criptografa a Chave Secreta de Sessão com a Chave Pública de Ana:");
console.log("   - Chave Secreta de Sessão criptografada assimetricamente:", chalk.yellow(sessaoCriptografadaAssimetricamente));

// João envia a mensagem real e a chave secreta criptografada para Ana
console.log("\n   João envia para Ana:");
console.log("     - A mensagem real criptografada simetricamente: ", chalk.yellow(mensagemRealEnviadaParaAna));
console.log("     - A chave secreta de sessão criptografada assimetricamente: ", chalk.yellow(sessaoCriptografadaAssimetricamente));

// Simulando um bisbilhoteiro que intercepta a comunicação
console.log("\n--- Bisbilhoteiro Intercepta a Comunicação ---");
console.log(chalk.red("\n--- 👺 Bisbilhoteiro intercepta a comunicação ---"));
console.log("   - Mensagem interceptada:", chalk.yellow(mensagemRealEnviadaParaAna));
console.log("   - Chave de sessão criptografada interceptada:", chalk.yellow(sessaoCriptografadaAssimetricamente));

console.log("\n--- Recepção e Descriptografia por Ana ---");
// Ana recebe os dados enviados de João
const dadosDeJoao = {
  mensagemCriptografada: mensagemRealEnviadaParaAna,
  chaveSecretaCriptografada: sessaoCriptografadaAssimetricamente
};

// 3. Ana Descriptografa a Chave Secreta
// Ana usa sua Chave Privada para descriptografar a chave secreta de sessão.
const chaveSecretaDeSessaoDescriptografadaStr = descriptografarAssimetrica(
  dadosDeJoao.chaveSecretaCriptografada,
  chavePrivadaDeAna
);

const chaveSecretaDeSessaoRecuperadaPorAna = parseInt(chaveSecretaDeSessaoDescriptografadaStr);
console.log("\n3. Ana usa sua Chave Privada para descriptografar a Chave Secreta de Sessão:");
console.log("   - Chave Secreta de Sessão recuperada por Ana:", chaveSecretaDeSessaoRecuperadaPorAna);

// Ana descriptografa a mensagem real usando a chave secreta de sessão que ela acabou de obter.
const mensagemDescriptografadaPorAna = descriptografarSimetrico(
  dadosDeJoao.mensagemCriptografada,
  chaveSecretaDeSessaoRecuperadaPorAna
);
// Ana recebe a mensagem
console.log("   - Mensagem de joao para ana:", chalk.green(mensagemDescriptografadaPorAna));

// 4. João e Ana se Comunicam Usando a Chave Compartilhada
console.log("\n4. João e Ana possuem a Chave Secreta de Sessão (", chaveSecretaDeSessaoRecuperadaPorAna, "), eles podem se comunicar livremente e com segurança:");

// Exemplo de uma resposta de Ana para João usando a mesma chave secreta
const respostaDeAna = "Oi João! Tudo certo por aqui!";
console.log("   - Resposta de Ana (original):", chalk.green(respostaDeAna));
const respostaDeAnaCriptografada = criptografarSimetrico(respostaDeAna, chaveSecretaDeSessaoRecuperadaPorAna);
console.log("   - Resposta de Ana (criptografada):", chalk.yellow(respostaDeAnaCriptografada));


// João recebe a resposta e a descriptografa com a mesma chave secreta
console.log("\nJoão Recebe a Resposta de Ana");
const respostaDescriptografadaPorJoao = descriptografarSimetrico(respostaDeAnaCriptografada, chaveSecretaDeSessaoGeradaPorJoao);
console.log("   - Resposta de Ana (descriptografada por João):", chalk.green(respostaDescriptografadaPorJoao));
