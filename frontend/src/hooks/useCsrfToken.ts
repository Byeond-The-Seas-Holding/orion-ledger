import { useEffect, useState } from 'react';

const BACKEND_URL = "https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer";

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // Fetch CSRF token on mount
    fetch(`${BACKEND_URL}/api/auth/csrf/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
      })
      .catch(err => console.error('Failed to fetch CSRF token:', err));
  }, []);

  return csrfToken;
}

// Helper function to get CSRF token from cookies (fallback)
export function getCsrfTokenFromCookie(): string {
  const name = 'csrftoken';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return '';
}

