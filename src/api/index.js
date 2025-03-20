import axios from 'axios';
import useAxios from '../hooks/useAxios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Use the custom hook
const { loading, error } = useAxios();

// Add loading state to the api object
api.loading = loading;
api.error = error;

export default api; 