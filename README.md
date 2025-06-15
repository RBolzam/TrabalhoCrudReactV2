## 📌 Lista de Tarefas (API REST)

Este projeto é um WebService REST simples desenvolvido com Node.js e Express, que simula um sistema de **lista de tarefas (To-do list)**.

> Não utiliza banco de dados — os dados são armazenados em memória (enquanto o servidor estiver rodando).

---

## Funcionalidades (CRUD)

| Método | Rota                  | Descrição                  |
|--------|-----------------------|-----------------------------|
| POST   | `/api/tarefas`        | Cria uma nova tarefa       |
| GET    | `/api/tarefas`        | Retorna todas as tarefas   |
| PUT    | `/api/tarefas/:id`    | Atualiza uma tarefa        |
| DELETE | `/api/tarefas/:id`    | Remove uma tarefa          |

---

## Como executar

### 1. Instale o Node.js
Baixe em: [https://nodejs.org](https://nodejs.org)

### 2. Acesse o diretório
cd todo-backend/backend

### 3. Instale as dependências 
npm install express cors

### 4. Inicie o servidor 
node index.js
