import { createContext, useState, useEffect, useCallback } from 'react';
import * as workersService from '../services/workersService';

export const WorkersContext = createContext();

export function WorkersProvider({ children }) {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchWorkers = useCallback(async () => {
    try {
      const data = await workersService.getWorkers();
      setWorkers(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al cargar trabajadores');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteWorker = async (id) => {
    try {
      await workersService.deleteWorkerById(id);
      await fetchWorkers();
      showNotification('Trabajador eliminado correctamente');
      return { success: true };
    } catch (err) {
      showNotification(
        err.response?.data?.message ||
          err.message ||
          'Error al eliminar trabajador',
        'error'
      );
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  return (
    <WorkersContext.Provider
      value={{
        workers,
        loading,
        error,
        notification,
        fetchWorkers,
        deleteWorker,
        showNotification
      }}
    >
      {children}
    </WorkersContext.Provider>
  );
}
