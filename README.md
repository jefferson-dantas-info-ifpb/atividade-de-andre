# Atividade sobre criptografia híbrida

A Criptografia híbrida, como o próprio nome já diz, consiste em unir a segurança da criptografia assimétrica com a velocidade de processamento da simétrica. Assim, são usadas tanto chaves públicas e privadas quanto as chaves de sessão. Quanta chave, hein? Pois é, precisamos trancar "muitas portas" para evitar que atacantes tenham sucesso, e queremos fazer isso de forma eficiente. Por isso a combinação dos dois tipos de criptografia. Em suma, a estratégia híbrida usa:

- 🛡️ Criptografia Assimétrica: usada para distribuir com segurança a chave secreta (chave de sessão).
- ⚡ Criptografia Simétrica: usada para criptografar os dados propriamente ditos, de forma mais rápida e eficiente.

<img src="https://imdtec.imd.ufrn.br/assets/imagens/seguranca-em-redes/seguranca_de_redes_a03_f07_c.jpg" />


Primeiro execute o comando a seguir para instalar as dependências (para a biblioteca de testagem)

```bash
npm install
```

Depois complete as funções em `criptografia.js` corretamente

Depois execute o seguinte comando para testar

> **ATENÇÃO**: Não altere o arquivo `criptografia.test.js`, a menos que seja necessário.

```bash
npm test
```

Se todos os testes passarem, então a atividade está completa.

Mas se os testes falharem, terá que corrigir o código até que todos os testes passem.

### Como executar o arquivo `src/index.js`

Use este arquivo para testar você mesmo o programa.

```bash
npm start
```


[Material Didático - IMD](https://materialpublic.imd.ufrn.br/curso/disciplina/4/62/3/9#:~:text=Jo%C3%A3o%20manda%20uma%20mensagem%20para,sess%C3%A3o%20que%20somente%20eles%20conhecem.)
