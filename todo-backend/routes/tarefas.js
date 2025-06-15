// backend/routes/tarefas.js
const express = require('express');
const router = express.Router();
const tarefas = require('../data/tarefas');

// CRIAR tarefa
router.post('/tarefas', (req, res) => {
  const { titulo, concluida = false } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: 'Título é obrigatório.' });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida,
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// LER tarefas
router.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

// ATUALIZAR tarefa
router.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id === parseInt(id));

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json(tarefa);
});

// DELETAR tarefa
router.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const index = tarefas.findIndex(t => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }

  const removida = tarefas.splice(index, 1);
  res.json(removida[0]);
});

module.exports = router;
