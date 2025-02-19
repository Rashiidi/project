import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure correct path

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Show nothing while loading
  if (loading) {
    return null; // or return a loading spinner
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to dashboard if user tries to access admin route without admin privileges
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;