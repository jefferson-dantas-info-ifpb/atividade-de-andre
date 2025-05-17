function gerarChaveSimetrica() {
  // Implementar
  // Retornar qualquer tipo
  return Math.floor(Math.random() * 25) + 1;
}

function criptografarSimetrico(mensagem, chave) {
  return mensagem
    .split('')
    .map(caractere =>
      String.fromCharCode(caractere.charCodeAt(0) + chave)
    )
    .join('');
}

function descriptografarSimetrico(mensagemCriptografada, chave) {
  return mensagemCriptografada
    .split('')
    .map(caractere =>
      String.fromCharCode(caractere.charCodeAt(0) - chave)
    )
    .join('');
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
