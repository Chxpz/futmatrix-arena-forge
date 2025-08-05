import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiClient } from '@/services/api-client';
import { whopAuth } from '@/services/whop-auth';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already logged in via session token
    const token = localStorage.getItem('whop_token');
    if (token) {
      navigate('/dashboard');
      return;
    }

    // Check for OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleWhopCallback(code);
    }
  }, [navigate]);

  const handleWhopCallback = async (code: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const redirectUri = `${window.location.origin}/auth`;
      const response = await apiClient.exchangeWhopCode(code, redirectUri);
      
      if (response.error) {
        setError(response.error.message);
        return;
      }

      if (response.token) {
        apiClient.setToken(response.token);
        setMessage('Authentication successful! Redirecting...');
        
        // Clean up URL
        window.history.replaceState({}, document.title, '/auth');
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error: any) {
      console.error('Whop callback error:', error);
      setError(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhopLogin = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getWhopAuthUrl();
      
      if (response.error) {
        setError(response.error.message);
        return;
      }
      
      // Open in new tab to avoid iframe CSP restrictions in Lovable preview
      const authWindow = window.open(response.authUrl, '_blank');
      
      if (!authWindow) {
        setError('Please allow popups and try again');
        setIsLoading(false);
        return;
      }
      
      // Check for auth completion by polling
      const checkAuth = setInterval(() => {
        try {
          if (authWindow.closed) {
            clearInterval(checkAuth);
            setIsLoading(false);
            // Refresh the page to check if user is now authenticated
            window.location.reload();
          }
        } catch (e) {
          // Cross-origin error is expected
        }
      }, 1000);
      
    } catch (error: any) {
      setError('Failed to initiate Whop authentication. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-matrix-dark via-matrix-darker to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text text-transparent">
            EAFC25 Platform
          </h1>
          <p className="text-gray-400 mt-2">Authenticate with Whop to access your gaming dashboard</p>
        </div>

        <Card className="bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Authenticate with Whop to access the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleWhopLogin}
              disabled={isLoading}
              className="w-full bg-neon-green text-black hover:bg-neon-green/90"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Continue with Whop
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                You'll be redirected to Whop to authenticate your membership
              </p>
            </div>

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


export default Auth;