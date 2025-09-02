import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL =  "http://localhost:8080" ;
// import.meta.env.VITE_API_URL ||

// Create axios instance with default config
export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
 

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const useApi = <T>(endpoint: string, dependencies: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get(endpoint);
        setData(response.data);
      } catch (err: any) {
        console.error('API Error:', err);
        setError(err.response?.data?.message || err.message || 'An error occurred');
        
        // Fallback to mock data for demo purposes
        if (endpoint.includes('/projects')) {
          const { mockData } = await import('../data/mockData');
          setData(mockData.projects as T);
        } else if (endpoint.includes('/blogs')) {
          const { mockData } = await import('../data/mockData');
          setData(mockData.blogs as T);
        } else if (endpoint.includes('/skills')) {
          const { mockData } = await import('../data/mockData');
          setData(mockData.skills as T);
        } else if (endpoint.includes('/experience')) {
          const { mockData } = await import('../data/mockData');
          setData(mockData.experience as T);
        } else if (endpoint.includes('/testimonials')) {
          const { mockData } = await import('../data/mockData');
          setData(mockData.testimonials as T);
        } else if (endpoint.includes('/analytics')) {
          const { mockData } = await import('../data/mockData');
          setData(mockData.analytics as T);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, ...dependencies]);

  const refetch = () => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(endpoint);
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  return { data, loading, error, refetch };
};

// Specific API hooks
export const useProjects = (category?: string) => {
  const endpoint = category && category !== 'All' 
    ? `/projects?category=${encodeURIComponent(category)}`
    : '/projects';
  return useApi(endpoint, [category]);
};

export const useBlogs = (search?: string, tag?: string) => {
  let endpoint = '/blogs';
  const params = new URLSearchParams();
  
  if (search) params.append('search', search);
  if (tag && tag !== 'All') params.append('tag', tag);
  
  if (params.toString()) endpoint += `?${params.toString()}`;
  
  return useApi(endpoint, [search, tag]);
};

// API functions for form submissions
export const submitContactForm = async (formData: any) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send message');
  }
};

export const submitTestimonial = async (testimonialData: any) => {
  try {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to submit testimonial');
  }
};

export const trackAnalytics = async (page: string, action: string = 'visit') => {
  try {
    await api.post('/analytics/track', { page, action });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};