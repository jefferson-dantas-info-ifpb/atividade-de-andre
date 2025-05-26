const {
  gerarChaveSimetrica,
  criptografarSimetrico,
  descriptografarSimetrico,
  gerarChavesAssimetricas,
  criptografarAssimetrica,
  descriptografarAssimetrica,
  hash
} = require('./criptografia.js')

const { chavePublica: chavePublicaBob, chavePrivada: chavePrivadaBob } = gerarChavesAssimetricas();
console.log("🔐 Bob gera sua chave pública:", chavePublicaBob);
console.log("🔓 Bob guarda sua chave privada:", chavePrivadaBob);

// =========================
// 👩 Alice quer enviar uma mensagem secreta para Bob
// =========================
const mensagemAlice = "Oi Bob, me envie os relatórios.";
console.log("\n👩 Mensagem de Alice:", mensagemAlice);

// =========================
// 🗝️ Alice gera uma chave simétrica temporária
// =========================
const chaveSimetricaAlice = gerarChaveSimetrica();
console.log("🔑 Alice gera chave simétrica:", chaveSimetricaAlice);

// =========================
// 🔒 Alice criptografa a mensagem usando a chave simétrica
// =========================
const mensagemCriptografada = criptografarSimetrico(mensagemAlice, chaveSimetricaAlice);
console.log("🔒 Mensagem criptografada (simétrica):", mensagemCriptografada);

// =========================
// 🔐 Alice criptografa a chave simétrica com a chave pública de Bob
// =========================
const chaveSimetricaCriptografada = criptografarAssimetrica(String(chaveSimetricaAlice), chavePublicaBob);
console.log("🗝️ Chave simétrica criptografada (assimétrica):", chaveSimetricaCriptografada);

// =========================
// 📦 Alice envia para Bob:
// mensagemCriptografada + chaveSimetricaCriptografada
// =========================


// =========================
// 📥 Bob recebe a mensagem
// =========================

// 🔓 Bob descriptografa a chave simétrica usando sua chave privada
const chaveSimetricaRecebida = parseInt(
  descriptografarAssimetrica(chaveSimetricaCriptografada, chavePrivadaBob)
);
console.log("\n🗝️ Bob descriptografa a chave simétrica:", chaveSimetricaRecebida);

// 🔑 Bob usa a chave simétrica para descriptografar a mensagem
const mensagemRecebida = descriptografarSimetrico(mensagemCriptografada, chaveSimetricaRecebida);
console.log("✅ Bob lê a mensagem:", mensagemRecebida);


console.log("\n🚨 🕵️ Eve interceptou os seguintes dados trafegando na rede:");
console.log("📦 Mensagem criptografada:", mensagemCriptografada);
console.log("🗝️ Chave simétrica criptografada:", chaveSimetricaCriptografada);

// Eve tenta ler a mensagem diretamente (não consegue)
// A mensagem aparece como texto embaralhado
console.log("\n❌ Eve tenta ler a mensagem (não descriptografada):", mensagemCriptografada);

// Eve também captura a chave simétrica criptografada
console.log("❌ Eve tenta obter a chave simétrica (não descriptografada):", chaveSimetricaCriptografada);

// ❌ Sem acesso à chave privada de Bob, Eve NÃO CONSEGUE descriptografar a chave simétrica
// ❌ Logo, também não consegue descriptografar a mensagem

console.log("\n🔒 Resultado: Eve vê dados embaralhados, mas não entende a mensagem.");
