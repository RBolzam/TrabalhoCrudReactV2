import { Outlet } from 'react-router-dom';
import ErrorPage from './ErrorPage';

export default function Layout() {

  return (
    <div className="container">
      <nav className="mb-4">
        <h1 className="text-center">Gerenciador de Tarefas</h1>
        <ul className="nav justify-content-center">
        </ul>
      </nav>
      <Outlet />
      
    </div>
  );
}

export function LayoutErrorBoundary() {
  return <ErrorPage />;
}