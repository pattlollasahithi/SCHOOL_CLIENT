import apiClient from './apiClient';

const noticeService = {
  getAll: async () => {
    const { data } = await apiClient.get('/api/notices');
    return data;
  },
  create: async (formData) => {
    const { data } = await apiClient.post('/api/notices', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  update: async (id, formData) => {
    const { data } = await apiClient.put(`/api/notices/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  delete: async (id) => {
    const { data } = await apiClient.delete(`/api/notices/${id}`);
    return data;
  },
};

export default noticeService;
