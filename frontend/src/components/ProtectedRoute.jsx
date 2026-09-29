import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Busca el token en la memoria del navegador
    const token = localStorage.getItem('token');

    // Si no hay token, lo redirige a la ruta principal (Login)
    if (!token) {
        return <Navigate to="/" />;
    }

    // Si hay token, renderiza la vista solicitada (children)
    return children;
};

export default ProtectedRoute;