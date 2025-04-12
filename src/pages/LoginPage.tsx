
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
