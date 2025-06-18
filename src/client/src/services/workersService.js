import api from './api';

export const getWorkers = async () => {
  const { data } = await api.get('/workers');
  return data;
};

export const getWorker = async (id) => {
  const { data } = await api.get(`/workers/${id}`);
  return data;
};

export const createWorker = async (workerData) => {
  const { data } = await api.post('/workers', workerData);
  return data;
};

export const updateWorker = async (id, workerData) => {
  const { data } = await api.put(`/workers/${id}`, workerData);
  return data;
};

export const deleteWorkerById = async (id) => {
  await api.delete(`/workers/${id}`);
  return { success: true };
};
