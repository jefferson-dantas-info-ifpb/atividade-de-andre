const { gcd, gerarNumeroPrimoAleatorio, modInverse, modPow } = require('./math')

function gerarChaveSimetrica() {
  // Implementar
  // Retornar qualquer tipo
  return Math.floor(Math.random() * 25) + 1
}

function criptografarSimetrico(mensagem, chave) {
  return mensagem
    .split('')
    .map((caractere) => String.fromCharCode(caractere.charCodeAt(0) + chave))
    .join('')
}

function descriptografarSimetrico(mensagemCriptografada, chave) {
  return mensagemCriptografada
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
  return mensagem
    .split('')
    .map((letra) => letra.charCodeAt(0))
    .map((numero) => modPow(numero, chavePublica.e, chavePublica.n))
    .map((numero) => String.fromCharCode(Number(numero)))
    .join('')
}

function descriptografarAssimetrica(mensagemCriptografada, chavePrivada) {
  return mensagemCriptografada
    .split('')
    .map((letra) => letra.charCodeAt(0))
    .map((numero) => modPow(numero, chavePrivada.d, chavePrivada.n))
    .map((numero) => String.fromCharCode(Number(numero)))
    .join('')
}

module.exports = {
  gerarChaveSimetrica,
  criptografarSimetrico,
  descriptografarSimetrico,
  gerarChavesAssimetricas,
  criptografarAssimetrica,
  descriptografarAssimetrica
}
