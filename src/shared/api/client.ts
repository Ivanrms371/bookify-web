import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
