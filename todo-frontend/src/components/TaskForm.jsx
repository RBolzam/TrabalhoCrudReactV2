import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        setTask({
          title: response.data.title,
          description: response.data.description || '',
          completed: response.data.completed
        });
      } catch (err) {
        setError('Falha ao carregar a tarefa');
        console.error(err);
        navigate('/');
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (id) {
        await axios.put(`http://localhost:5000/tasks/${id}`, task);
      } else {
        await axios.post('http://localhost:5000/tasks', task);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar tarefa');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título *</Form.Label>
          <Form.Control
            type="text"
            value={task.title}
            onChange={(e) => setTask({...task, title: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={task.description}
            onChange={(e) => setTask({...task, description: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check 
            type="checkbox"
            label="Concluída"
            checked={task.completed}
            onChange={(e) => setTask({...task, completed: e.target.checked})}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/')}
          >
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {id ? 'Atualizar Tarefa' : 'Criar Tarefa'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default TaskForm;