# Atividade sobre criptografia híbrida

A Criptografia híbrida, como o próprio nome já diz, consiste em unir a segurança da criptografia assimétrica com a velocidade de processamento da simétrica. Assim, são usadas tanto chaves públicas e privadas quanto as chaves de sessão. Quanta chave, hein? Pois é, precisamos trancar "muitas portas" para evitar que atacantes tenham sucesso, e queremos fazer isso de forma eficiente. Por isso a combinação dos dois tipos de criptografia. Em suma, a estratégia híbrida usa:

- 🛡️ Criptografia Assimétrica: usada para distribuir com segurança a chave secreta (chave de sessão).
- ⚡ Criptografia Simétrica: usada para criptografar os dados propriamente ditos, de forma mais rápida e eficiente.

<img src="https://imdtec.imd.ufrn.br/assets/imagens/seguranca-em-redes/seguranca_de_redes_a03_f07_c.jpg" />



## 🧠 Como funciona?

1. O remetente gera uma **chave de sessão** (simétrica).
2. Os **dados** são criptografados usando essa chave (criptografia **simétrica**).
3. A chave de sessão é criptografada com a **chave pública** do destinatário (criptografia **assimétrica**).
4. O destinatário usa sua **chave privada** para recuperar a chave de sessão e, com ela, decifra os dados.

## 🚀 Vantagens

- ✅ Alta segurança na troca de chaves
- ✅ Maior velocidade na criptografia de grandes volumes de dados
- ✅ Combinação eficiente de desempenho e proteção


## Desvantagens:

 - Alto consumo de recursos computacionais, especialmente em dispositivos com hardware limitado.
 - Complexidade maior na implementação e gerenciamento do sistema.
 - Aumento da latência e do uso de largura de banda devido à troca de chaves assimétricas.
 - Dificuldade na manutenção e atualização do sistema.

## 📦 Onde é usada?

### 🌐 1. **HTTPS / SSL / TLS**

* **Descrição**: Quando você acessa sites seguros (começam com `https://`), o navegador e o servidor usam criptografia híbrida.
* **Como**: A chave de sessão (simétrica) é trocada com segurança usando criptografia assimétrica no início da conexão (handshake).

### 📧 2. **E-mails Criptografados (ex: PGP, S/MIME)**

* **Descrição**: Soluções como **PGP (Pretty Good Privacy)** usam criptografia híbrida para proteger o conteúdo dos e-mails.
* **Como**: O conteúdo do e-mail é criptografado com uma chave simétrica, e essa chave é criptografada com a chave pública do destinatário.

### 📲 3. **Aplicativos de Mensagens Seguras**

* **Exemplos**: **Signal**, **WhatsApp**, **Telegram (chats secretos)**.
* **Como**: Mensagens são criptografadas com uma chave simétrica (eficiente), mas a chave é trocada com segurança via criptografia assimétrica.

### 🧾 4. **Assinatura e Compartilhamento de Documentos**

* **Exemplos**: Sistemas de assinatura digital como **DocuSign**, **Adobe Sign**.
* **Como**: Documentos são criptografados com chaves simétricas e compartilhados com segurança usando chaves públicas dos destinatários.

### 🛡️ 5. **VPNs e Redes Privadas Seguras**

* **Descrição**: VPNs utilizam criptografia híbrida para estabelecer túneis seguros entre o cliente e o servidor.
* **Como**: Durante a negociação da conexão, usa-se criptografia assimétrica para trocar a chave simétrica da sessão.

### 💳 6. **Pagamentos Online e Comércio Eletrônico**

* **Descrição**: Sistemas de pagamento, como gateways e bancos, utilizam criptografia híbrida para proteger transações.
* **Como**: Os dados de pagamento são criptografados com simétrica, e a chave é trocada com criptografia assimétrica.

> [!CAUTION]
> Usar criptografia híbrida em ambientes com recursos limitados (como IoT) pode causar lentidão, falhas de processamento ou consumo excessivo de energia, prejudicando a performance do sistema.
>
> Em contextos onde já existe uma chave simétrica segura previamente compartilhada, a adição da criptografia assimétrica só aumenta a complexidade sem ganho real em segurança.
>
> Para dados pequenos ou locais, o uso desnecessário de criptografia híbrida pode representar desperdício de recursos computacionais e dificultar a manutenção do sistema.


<hr/>

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
