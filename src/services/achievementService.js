import apiClient from './apiClient';

const achievementService = {
  getAll: async () => {
    const { data } = await apiClient.get('/api/achievements');
    return data;
  },
  create: async (formData) => {
    const { data } = await apiClient.post('/api/achievements', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  update: async (id, formData) => {
    const { data } = await apiClient.put(`/api/achievements/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  delete: async (id) => {
    const { data } = await apiClient.delete(`/api/achievements/${id}`);
    return data;
  },
};

export default achievementService;
