function gerarNumeroPrimoAleatorio(min = 10, max = 300) {
  let numero

  // Gera números aleatórios até encontrar um primo
  // Para cada número gerado, verifica se é primo
  do {
    numero = Math.floor(Math.random() * (max - min + 1)) + min
  } while (!verificaPrimo(numero))

  return numero
}

function verificaPrimo(numero) {
  // Números menores ou iguais a 1 não são primos
  if (numero <= 1) return false

  // Verifica se o número é divisível por algum outro número
  for (let i = 2; i <= Math.sqrt(numero); i++) {
    // Se o número for divisível por i, não é primo
    if (numero % i === 0) return false
  }

  return true
}

// GCD (usado no cálculo do inverso modular)
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

// Inverso modular (usando algoritmo de Euclides estendido)
function modInverse(e, phi) {
  let [a, b] = [e, phi]
  let [x, y] = [1, 0]
  while (b !== 0) {
    let q = Math.floor(a / b)
    ;[a, b] = [b, a % b]
    ;[x, y] = [y, x - q * y]
  }
  return (x + phi) % phi
}

// Função para exponenciação modular
function modPow(base, exponent, mod) {
  let result = 1
  base %= mod
  while (exponent > 0) {
    if (exponent % 2 === 1) result = (result * base) % mod
    base = (base * base) % mod
    exponent = Math.floor(exponent / 2)
  }
  return result
}

module.exports = {
  gerarNumeroPrimoAleatorio,
  verificaPrimo,
  gcd,
  modInverse,
  modPow
}
