import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BACKEND_URL = "https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer";

export default function LoginSimple() {
  const [, setLocation] = useLocation();
  const { checkAuth } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Login failed' }));
        console.error('Login failed:', data);
        setError(data.error || 'Login failed');
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      
      // Wait a bit for cookies to be set
      await new Promise(resolve => setTimeout(resolve, 500));
      await checkAuth();
      console.log('Auth checked, redirecting...');
      setLocation('/dashboard');
      
    } catch (err) {
      console.error('Network error:', err);
      setError(`Network error: ${err instanceof Error ? err.message : 'Please try again'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Accounting Software</CardTitle>
          <CardDescription>Accounting software for US companies</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>Default credentials:</p>
              <p className="font-mono">admin@example.com / admin123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

