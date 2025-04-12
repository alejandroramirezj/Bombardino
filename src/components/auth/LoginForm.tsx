import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { GoogleLogin } from '@react-oauth/google';

// Tipo para definir los diferentes modos del formulario
type FormMode = 'login' | 'register' | 'resetPassword';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('login');
  const { login, loginWithGoogle, register, resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Introduce un email válido');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let success = false;
      
      switch (formMode) {
        case 'login':
          if (!password) {
            toast.error('Introduce tu contraseña');
            setIsSubmitting(false);
            return;
          }
          success = await login(email, password);
          break;
          
        case 'register':
          if (!password) {
            toast.error('Introduce una contraseña');
            setIsSubmitting(false);
            return;
          }
          if (password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            setIsSubmitting(false);
            return;
          }
          if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            setIsSubmitting(false);
            return;
          }
          success = await register(email, password, name);
          break;
          
        case 'resetPassword':
          success = await resetPassword(email);
          break;
      }
      
      if (success && formMode !== 'resetPassword') {
        // After successful login or registration, redirect to the home page
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else if (success && formMode === 'resetPassword') {
        // After reset password request, go back to login
        setFormMode('login');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al procesar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    switch (formMode) {
      case 'login':
        return (
          <>
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
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Contraseña</Label>
                <button 
                  type="button"
                  onClick={() => setFormMode('resetPassword')}
                  className="text-xs text-brainrot-blue hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-brainrot-dark border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </>
        );
        
      case 'register':
        return (
          <>
            <div>
              <Label htmlFor="name">Nombre</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-brainrot-dark border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
            
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
            </div>
            
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-brainrot-dark border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-brainrot-dark border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </>
        );
        
      case 'resetPassword':
        return (
          <div>
            <Label htmlFor="email">Email</Label>
            <p className="text-gray-400 text-sm mb-2">
              Introduce tu email y te enviaremos instrucciones para restablecer tu contraseña.
            </p>
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
          </div>
        );
    }
  };

  const getFormTitle = () => {
    switch (formMode) {
      case 'login': return 'Iniciar sesión';
      case 'register': return 'Crear cuenta';
      case 'resetPassword': return 'Recuperar contraseña';
    }
  };

  const getButtonText = () => {
    switch (formMode) {
      case 'login': return 'Iniciar sesión';
      case 'register': return 'Registrarse';
      case 'resetPassword': return 'Enviar instrucciones';
    }
  };

  return (
    <div className="bg-brainrot-light p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{getFormTitle()}</h2>
        <p className="text-gray-400">
          {formMode === 'login' ? 'Accede para votar por tus personajes favoritos' : 
           formMode === 'register' ? 'Únete y crea tus propios personajes' : 
           'Recupera el acceso a tu cuenta'}
        </p>
      </div>
      
      {formMode !== 'resetPassword' && (
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
      )}
      
      {formMode !== 'resetPassword' && (
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-brainrot-light px-2 text-gray-400">o continúa con</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderFormFields()}
        
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
            getButtonText()
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        {formMode === 'login' ? (
          <p className="text-sm text-gray-500">
            ¿No tienes una cuenta? 
            <button 
              type="button"
              onClick={() => setFormMode('register')}
              className="ml-1 text-brainrot-blue hover:underline"
            >
              Regístrate
            </button>
          </p>
        ) : formMode === 'register' ? (
          <p className="text-sm text-gray-500">
            ¿Ya tienes una cuenta? 
            <button 
              type="button"
              onClick={() => setFormMode('login')}
              className="ml-1 text-brainrot-blue hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            <button 
              type="button"
              onClick={() => setFormMode('login')}
              className="text-brainrot-blue hover:underline"
            >
              Volver al inicio de sesión
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
