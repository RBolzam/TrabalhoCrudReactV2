import { useRouteError, useNavigate } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const errorDetails = {
    title: 'Erro inesperado!',
    message: error.data?.message || error.message,
    code: error.status || 500
  };

  return (
    <div className="mt-5">
      <Alert variant="danger" className="text-center">
        <h1>{errorDetails.title}</h1>
        <p className="h4 mt-3">{errorDetails.message}</p>
        <p className="text-muted mt-2">Código do erro: {errorDetails.code}</p>
        
        <div className="mt-4">
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
            className="me-2"
          >
            Página Inicial
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </div>
      </Alert>
    </div>
  );
}