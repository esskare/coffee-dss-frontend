import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:7066', // Change to your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout of 10 seconds
});

// Request interceptor (Optional: Add auth token if needed)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (Optional: Handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const login = async (credentials: any) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data; // { token: "your-jwt-token", user: { ... } }
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  get<T>(url: string, params = {}): Promise<T> {
    return apiClient.get(url, { params }).then((res) => res.data);
  },

  post<T>(url: string, data: any): Promise<T> {
    return apiClient.post(url, data).then((res) => res.data);
  },

  put<T>(url: string, data: any): Promise<T> {
    return apiClient.put(url, data).then((res) => res.data);
  },

  delete<T>(url: string): Promise<T> {
    return apiClient.delete(url).then((res) => res.data);
  },

  patch<T>(url: string, data: any): Promise<T> {
    return apiClient.patch(url, data).then((res) => res.data);
  },
};
