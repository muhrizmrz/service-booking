import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      setLoading(true);
      setError(null);
      return config;
    },
    (error) => {
      setLoading(false);
      setError(error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      setError(error);
      return Promise.reject(error);
    }
  );

  return { loading, error };
};

export default useAxios; 