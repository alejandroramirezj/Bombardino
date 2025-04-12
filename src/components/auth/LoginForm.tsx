import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { GoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Inserisci un indirizzo email valido');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email);
      // After successful login, redirect to the home page
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error('Si è verificato un errore durante l\'accesso');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brainrot-light p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Accedi al Brainrot</h2>
        <p className="text-gray-400">Entra para votar tus personajes favoritos</p>
      </div>
      
      <div className="mb-6">
        <GoogleLogin
          onSuccess={(response) => {
            if (response.credential) {
              loginWithGoogle(response.credential);
              navigate('/');
            }
          }}
          onError={() => {
            toast.error('Error al iniciar sesión con Google');
          }}
          theme="filled_blue"
          shape="pill"
          width="100%"
          text="signin_with"
          locale="es"
        />
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-brainrot-light px-2 text-gray-400">o continúa con</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-brainrot-dark border-gray-700 text-white placeholder:text-gray-500"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Te enviaremos un magic link para acceder sin contraseña
          </p>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-brainrot-blue hover:bg-brainrot-blue/90"
          disabled={isSubmitting || isLoading}
        >
          {(isSubmitting || isLoading) ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            "Enviar magic link"
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Para esta demo, el acceso es inmediato para propósitos de prueba.
          <br />En una aplicación real, recibirías un email con un enlace para acceder.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
