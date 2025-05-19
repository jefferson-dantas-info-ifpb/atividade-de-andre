const {
  gerarChaveSimetrica,
  criptografarSimetrico,
  descriptografarSimetrico,
  gerarChavesAssimetricas,
  criptografarAssimetrica,
  descriptografarAssimetrica
} = require('./criptografia.js')

const { chavePublica, chavePrivada } = gerarChavesAssimetricas()
const mensagem = 'Olá, mundo!'
const mensagemCriptografada = criptografarAssimetrica(mensagem, chavePublica)
console.log('Mensagem criptografada:', mensagemCriptografada)
const mensagemDescriptografada = descriptografarAssimetrica(mensagemCriptografada, chavePrivada)
console.log('Mensagem descriptografada:', mensagemDescriptografada)
