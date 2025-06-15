import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Badge } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Tarefas</h1>
        <Link to="/new" className="btn btn-primary">
          Nova Tarefa
        </Link>
      </div>

      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item 
            key={task.id} 
            className="d-flex justify-content-between align-items-start"
            variant={task.completed ? 'success' : ''}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                {task.title}
                {task.completed && (
                  <Badge bg="success" className="ms-2">Concluída</Badge>
                )}
              </div>
              {task.description}
            </div>
            
            <div className="d-flex gap-2">
              <Link 
                to={`/edit/${task.id}`} 
                className="btn btn-outline-primary btn-sm"
              >
                <PencilSquare />
              </Link>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => handleDelete(task.id)}
              >
                <Trash />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {tasks.length === 0 && (
        <div className="text-center mt-4 text-muted">
          Nenhuma tarefa encontrada
        </div>
      )}
    </div>
  );
};

export default TaskList;