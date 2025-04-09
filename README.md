# Trabalho de Docker Compose - Validador de CPF

Este projeto foi desenvolvido para a disciplina de Computação Orientada a Serviços, sob orientação do professor Tercio de Morais, na Universidade Federal de Alagoas - Campus Arapiraca, pelos alunos **Caio Teixeira da Silva** e **Gustavo Henrique dos Santos Malaquias**.

O objetivo deste trabalho é criar um sistema cliente-servidor simples utilizando Docker Compose. No projeto, o **servidor** (em um container) hospeda um serviço que valida CPF por meio de uma API e exibe uma página web, enquanto o **cliente** (em outro container) envia uma requisição com um CPF para que o servidor retorne se o CPF é válido ou não.

---

## Sumário

- [Descrição](#descrição)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Como Executar](#como-executar)
- [Detalhes Técnicos](#detalhes-técnicos)
- [Autores](#autores)

---

## Descrição

O sistema é composto por dois serviços:

- **Servidor:**  
  - Implementado em Node.js utilizando Express.
  - Hospeda uma página web (HTML) que permite a validação de CPF por meio de um formulário interativo.
  - Expõe uma rota `/validate` que recebe um CPF e utiliza uma função para verificar sua validade.
  - Serve conteúdos estáticos (página HTML, CSS e scripts) e opera na porta `3000`.

- **Cliente:**  
  - Implementado em Node.js utilizando Axios para realizar requisições HTTP.
  - Envia uma requisição para o servidor contendo um CPF e exibe a resposta (se o CPF é válido ou não) no console.

O uso do **Docker Compose** permite a orquestração dos dois containers, garantindo a comunicação entre eles. O container do cliente depende do container do servidor, facilitando o teste da integração entre os serviços.

---

## Estrutura do Projeto

A organização dos arquivos do projeto pode ser a seguinte:

```plaintext
.
├── docker-compose.yml
├── server
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── public
│       └── index.html
└── client
    ├── Dockerfile
    ├── package.json
    └── client.js
```

---

## Requisitos

- Docker
- Docker Compose
- (Opcional) Node.js e npm

---

## Como Executar

```bash
docker-compose up --build
```

Acesse `http://localhost:3000` para utilizar a interface web do servidor.

Para visualizar a resposta do cliente via terminal:

```bash
docker logs client
```

---

## Detalhes Técnicos

### Servidor

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
```

### Cliente

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "client.js" ]
```

### docker-compose.yml

```yaml
version: "3.8"
services:
  server:
    build: ./server
    container_name: server
    ports:
      - "3000:3000"
  client:
    build: ./client
    container_name: client
    depends_on:
      - server
```

---

## Autores

- **Caio Teixeira da Silva**
- **Gustavo Henrique dos Santos Malaquias**

**Professor:** Tercio de Morais  
**Universidade Federal de Alagoas - Campus Arapiraca**

---
