const { gcd, gerarNumeroPrimoAleatorio, modInverse, modPow } = require('./math')

function gerarChaveSimetrica() {
  // Implementar
  // Retornar qualquer tipo
  return Math.floor(Math.random() * 25) + 1
}

function criptografarSimetrico(mensagem, chave) {
  const criptografada = mensagem
    .split('')
    .map((caractere) => String.fromCharCode(caractere.charCodeAt(0) + chave))
    .join('')

  return Buffer.from(criptografada, 'utf8').toString('base64')
}

function descriptografarSimetrico(mensagemCriptografada, chave) {
  const decriptografada = Buffer.from(mensagemCriptografada, 'base64').toString('utf8')

  return decriptografada
    .split('')
    .map((caractere) => String.fromCharCode(caractere.charCodeAt(0) - chave))
    .join('')
}

function gerarChavesAssimetricas() {
  // Dois números primos aleatórios
  let p, q

  // Gera dois números primos aleatórios até que eles sejam diferentes
  do {
    p = gerarNumeroPrimoAleatorio()
    q = gerarNumeroPrimoAleatorio()
  } while (p === q)

  // N é a multiplicação dos dois números primos
  const n = p * q

  // Função totiente de Euler
  const phi = (p - 1) * (q - 1)

  let e = 3
  while (gcd(e, phi) !== 1) e++ // e = 3, 5, 7, etc. até ser coprimo com phi

  // Inverso modular de e em relação a phi
  const d = modInverse(e, phi)

  return {
    chavePublica: { e, n },
    chavePrivada: { d, n }
  }
}

function criptografarAssimetrica(mensagem, chavePublica) {
 const numerosCriptografados = String(mensagem)
  .split('')
  .map((letra) => letra.charCodeAt(0))
  .map((numero) => modPow(numero, chavePublica.e, chavePublica.n));

  // Converte os números criptografados para hexadecimal e os junta com '-'
  return numerosCriptografados.map(n => n.toString(16)).join('-'); 
}

function descriptografarAssimetrica(mensagemCriptografada, chavePrivada) {
  // Divide a mensagem criptografada em partes, converte de hexadecimal para inteiro
  const numerosCriptografados = mensagemCriptografada.split('-').map(s => parseInt(s, 16));

  return numerosCriptografados
    .map((numero) => modPow(numero, chavePrivada.d, chavePrivada.n))
    .map((numero) => String.fromCharCode(Number(numero)))
    .join('');
}

module.exports = {
  gerarChaveSimetrica,
  criptografarSimetrico,
  descriptografarSimetrico,
  gerarChavesAssimetricas,
  criptografarAssimetrica,
  descriptografarAssimetrica
}
