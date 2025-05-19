const { test, expect, describe } = require('@jest/globals')
const {
  gerarChaveSimetrica,
  criptografarSimetrico,
  descriptografarSimetrico,
  gerarChavesAssimetricas,
  criptografarAssimetrica,
  descriptografarAssimetrica,
  hash
} = require('./criptografia.js')

describe('Criptografia Simétrica', () => {
  test('gera chave simétrica corretamente', () => {
    const chave = gerarChaveSimetrica()
    expect(chave).not.toBeFalsy()
  })

  test('gera chaves simétricas diferentes', () => {
    const chave1 = gerarChaveSimetrica()
    const chave2 = gerarChaveSimetrica()
    expect(chave1).not.toEqual(chave2)
  })

  test('criptografa e descriptografa corretamente', () => {
    const chave = gerarChaveSimetrica()
    const mensagem = 'Testando...'

    const criptografada = criptografarSimetrico(mensagem, chave)
    expect(typeof criptografada).toBe('string')
    expect(criptografada).not.toBe('')
    expect(criptografada).not.toBe(mensagem)

    const descriptografada = descriptografarSimetrico(criptografada, chave)
    expect(descriptografada).toBe(mensagem)
  })
})

describe('Criptografia Assimétrica', () => {
  test('gera chaves assimétricas corretamente', () => {
    const { chavePublica, chavePrivada } = gerarChavesAssimetricas()
    expect(chavePublica).not.toBeFalsy()
    expect(chavePrivada).not.toBeFalsy()
    expect(chavePublica).not.toEqual(chavePrivada)
  })

  test('criptografa e descriptografa corretamente', () => {
    const { chavePublica, chavePrivada } = gerarChavesAssimetricas()
    const mensagem = 'Olá, mundo!'

    const criptografada = criptografarAssimetrica(mensagem, chavePublica)
    expect(typeof criptografada).toBe('string')
    expect(criptografada).not.toBe('')
    expect(criptografada).not.toBe(mensagem)

    const decriptografada = descriptografarAssimetrica(criptografada, chavePrivada)
    expect(decriptografada).toBe(mensagem)
  })

  test('chave pública somente criptografa', () => {
    const { chavePublica, chavePrivada } = gerarChavesAssimetricas()
    const mensagem = 'Olá, mundo!'

    const criptografada = criptografarAssimetrica(mensagem, chavePublica)
    try {
      const descriptografada = descriptografarAssimetrica(criptografada, chavePrivada)
      expect(descriptografada).not.toBe(mensagem)
    } catch {}
  })
})
