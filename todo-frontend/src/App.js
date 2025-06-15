import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout, { LayoutErrorBoundary } from './components/Layout';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <LayoutErrorBoundary />,
    children: [
      {
        path: '/',
        element: <TaskList />,
        errorElement: <ErrorPage />
      },
      {
        path: '/new',
        element: <TaskForm />,
        errorElement: <ErrorPage />
      },
      {
        path: '/edit/:id',
        element: <TaskForm />,
        errorElement: <ErrorPage />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}