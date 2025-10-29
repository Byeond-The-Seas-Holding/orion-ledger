/**
 * API Configuration
 * 
 * Centralized configuration for backend API URLs.
 * Automatically detects environment and uses appropriate URL.
 */

/**
 * Get the backend API base URL based on environment
 * 
 * Priority order:
 * 1. VITE_BACKEND_URL environment variable
 * 2. Current window origin (for production builds served from same domain)
 * 3. Fallback to localhost:8000 (for development)
 */
export const getBackendURL = (): string => {
  // Check environment variable first
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // In development mode, use localhost:8000
  if (import.meta.env.DEV) {
    return 'http://localhost:8000';
  }
  
  // In production, use same origin
  return window.location.origin;
};

/**
 * Backend base URL
 */
export const BACKEND_URL = getBackendURL();

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // Auth
  csrf: `${BACKEND_URL}/api/csrf/`,
  login: `${BACKEND_URL}/api/login/`,
  logout: `${BACKEND_URL}/api/logout/`,
  
  // Companies
  companies: `${BACKEND_URL}/api/companies/`,
  
  // Accounts
  accounts: `${BACKEND_URL}/api/accounts/`,
  
  // Transactions
  transactions: `${BACKEND_URL}/api/transactions/`,
  
  // Documents
  documents: `${BACKEND_URL}/api/documents/`,
  
  // IRS Forms
  irsForms: `${BACKEND_URL}/api/irs-forms/`,
  
  // Reports
  reports: `${BACKEND_URL}/api/reports/`,
};

