// import axios from 'axios';
// import { Platform } from 'react-native';

// const BASE_URL = Platform.select({
//   ios: 'http://localhost:8000',
//   android: 'http://10.0.2.2:8000',
//   default: 'http://localhost:8000'
// });

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const getTasks = () => api.get('/tasks/');
// export const createTask = (task) => api.post('/tasks/', task);
// export const updateTask = (id, task) => api.patch(`/tasks/${id}/`, task);
// export const deleteTask = (id) => api.delete(`/tasks/${id}/`);
// export const chatWithAI = (message, conversationHistory = []) =>
//   api.post('/ai/chat/', { message, conversation_history: conversationHistory });


import axios from 'axios';
import { Platform } from 'react-native';

const getBaseURL = () => {
  if (__DEV__) {
    return Platform.select({
      ios: 'http://10.0.0.67:8000',
      android: 'http://10.0.2.2:8000',
    });
  }
  return 'https://your-production-url.com';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = () => api.get('/tasks/');
export const createTask = (task) => api.post('/tasks/', task);
export const updateTask = (id, task) => api.patch(`/tasks/${id}/`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}/`);
export const chatWithAI = (message, conversationHistory = []) =>
  api.post('/ai/chat/', { message, conversation_history: conversationHistory });

export const transcribeAudio = (formData) =>
  api.post('/voice/transcribe/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });