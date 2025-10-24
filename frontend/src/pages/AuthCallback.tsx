import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { checkAuth } = useAuth();

  useEffect(() => {
    // After OAuth redirect, check auth status and redirect to dashboard
    const handleCallback = async () => {
      await checkAuth();
      setLocation('/dashboard');
    };

    handleCallback();
  }, [checkAuth, setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

