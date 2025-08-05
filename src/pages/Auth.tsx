import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiClient } from '@/services/api-client';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already logged in via session token
    const token = localStorage.getItem('auth_token');
    if (token) {
      apiClient.setToken(token);
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await apiClient.signIn(email, password);
      
      // Store session token
      if (response.session?.access_token) {
        localStorage.setItem('auth_token', response.session.access_token);
        apiClient.setToken(response.session.access_token);
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'Sign in failed');
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await apiClient.signUp(email, password);
      setMessage('Account created successfully! You can now sign in.');
    } catch (error: any) {
      setError(error.message || 'Sign up failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-matrix-dark via-matrix-darker to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text text-transparent">
            EAFC25 Platform
          </h1>
          <p className="text-gray-400 mt-2">Access your gaming performance dashboard</p>
        </div>

        <Card className="bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-matrix-darker">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="signup">
                <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
              </TabsContent>
            </Tabs>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {message && (
              <Alert className="mt-4 border-neon-green/50">
                <AlertCircle className="h-4 w-4 text-neon-green" />
                <AlertDescription className="text-neon-green">{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SignInForm = ({ onSubmit, isLoading }: { onSubmit: (email: string, password: string) => void; isLoading: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-matrix-darker border-matrix-gray/30"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-matrix-darker border-matrix-gray/30"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-neon-green text-black hover:bg-neon-green/90"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  );
};

const SignUpForm = ({ onSubmit, isLoading }: { onSubmit: (email: string, password: string) => void; isLoading: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    setPasswordError('');
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-matrix-darker border-matrix-gray/30"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-matrix-darker border-matrix-gray/30"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="bg-matrix-darker border-matrix-gray/30"
        />
      </div>
      
      {passwordError && (
        <p className="text-sm text-red-400">{passwordError}</p>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-neon-green text-black hover:bg-neon-green/90"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign Up
      </Button>
    </form>
  );
};

export default Auth;