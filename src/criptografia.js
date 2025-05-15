function gerarChaveSimetrica() {
  // Implementar
  // Retornar qualquer tipo
}

function criptografarSimetrico(mensagem, chave) {
  // Implementar
  // Retornar string
}

function descriptografarSimetrico(mensagemCriptografada, chave) {
  // Implementar
}

function gerarChavesAssimetricas() {
  // Implementar
  // return {
  //   chavePublica: ...,
  //   chavePrivada: ...
  // }
}

function criptografarAssimetrica(mensagem, chavePublica) {
  // Implementar
  // Retornar string
}

function descriptografarAssimetrica(mensagemCriptografada, chavePrivada) {
  // Implementar
  // Retornar string
}

function hash(mensagem) {
  // Implementar
  // Retornar string
}

module.exports = {
  gerarChaveSimetrica,
  criptografarSimetrico,
  descriptografarSimetrico,
  gerarChavesAssimetricas,
  criptografarAssimetrica,
  descriptografarAssimetrica,
  hash
}
