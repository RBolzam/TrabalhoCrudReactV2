// todo-backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();

const tarefasRoutes = require('./routes/tarefas');

app.use(cors());
app.use(express.json());

app.use('/api', tarefasRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
