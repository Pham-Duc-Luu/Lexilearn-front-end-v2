import axios from 'axios';

export const authenticationInstance = axios.create({
  baseURL:
    (import.meta.env.VITE_PUBLIC_API_BASE_URL || 'localhost') +
    '/user/api/v1/auth',
});
