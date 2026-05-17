import api from './api';

export const taskService = {
  getTasks: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    const { data } = await api.get(`/tasks?${params.toString()}`);
    return data;
  },

  getTask: async (id) => {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },

  createTask: async (taskData) => {
    const { data } = await api.post('/tasks', taskData);
    return data;
  },

  updateTask: async (id, taskData) => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data;
  },

  updateStatus: async (id, status) => {
    const { data } = await api.patch(`/tasks/${id}/status`, { status });
    return data;
  },

  deleteTask: async (id) => {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
  },
};
