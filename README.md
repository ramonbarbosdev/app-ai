# MemorixAI Frontend

Frontend do **MemorixAI**, um assistente de inteligência artificial com memória persistente, desenvolvido com Angular e TailwindCSS.

Esta aplicação fornece uma interface moderna e interativa para comunicação com a API, permitindo conversas contínuas com persistência de contexto.

---

## Tecnologias utilizadas

* Angular 17+
* TypeScript
* TailwindCSS
* Angular Signals
* Standalone Components
* REST API integration

---

## Funcionalidades

* Interface de chat moderna e responsiva
* Envio e recebimento de mensagens em tempo real
* Indicador de digitação
* Persistência de conversas
* Gerenciamento de estado com Signals
* Arquitetura baseada em componentes standalone

---

## Estrutura do projeto

```
src/app/
 ├── core/              # Serviços e lógica principal
 ├── features/chat/components     # Componentes do chat
 │    ├── chat-header
 │    ├── chat-canvas
 │    ├── chat-input
 │    └── chat-message
 ├── shared/            # Componentes reutilizáveis
 └── app.ts
```

---

## Configuração

Configure a URL da API no environment:

```
src/environments/environment.ts
```

Exemplo:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

## Executando o projeto

Clone o repositório:

```
git clone https://github.com/ramonbarbosdev/app-ai.git
```

Entre na pasta:

```
cd app-ai
```

Instale as dependências:

```
npm install
```

Execute o projeto:

```
ng serve
```

Acesse no navegador:

```
http://localhost:4200
```

---

## Integração com API

Endpoint utilizado:

```
POST /api/chat
```

Exemplo de requisição:

```json
{
  "message": "Olá"
}
```

---

## Objetivo

Este projeto faz parte do portfólio com foco em:

* Interfaces modernas para assistentes de IA
* Arquitetura frontend escalável com Angular
* Integração com backend Spring Boot e Spring AI
* Experiência de usuário fluida e responsiva

---

## Autor

Ramon Barbosa
Desenvolvedor Full Stack
Angular | Spring Boot | AI
