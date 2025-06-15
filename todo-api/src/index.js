const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: { title, description: description || null }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(req.params.id) }
    });
    task ? res.json(task) : res.status(404).json({ error: 'Tarefa não encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando na porta ${PORT}`);
  console.log(`📄 Documentação: http://localhost:${PORT}/api-docs`);
});