import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkersContext } from '../context/WorkersContext';
import WorkerForm from '../components/WorkerForm';
import api from '../services/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function EditWorker() {
  const { id } = useParams();
  const { workers, fetchWorkers } = useContext(WorkersContext);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const worker = workers.find((w) => w.id === parseInt(id));
    if (worker) {
      setInitialData(worker);
      setLoading(false);
    } else {
      const fetchWorker = async () => {
        try {
          const { data } = await api.get(`/workers/${id}`);
          setInitialData(data);
        } catch (err) {
          setSubmitError(
            err.response?.data?.message ||
              err.message ||
              'Error al cargar trabajador'
          );
        } finally {
          setLoading(false);
        }
      };
      fetchWorker();
    }
  }, [id, workers]);

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    setSubmitError(null);
    try {
      await api.put(`/workers/${id}`, formData);
      await fetchWorkers();
      navigate('/', {
        state: { successMessage: 'Trabajador actualizado correctamente' }
      });
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          err.message ||
          'Error al actualizar trabajador'
      );
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className='max-w-4xl mx-auto p-4'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4'
        >
          <FaArrowLeft /> Volver
        </button>
        <div className='bg-red-50 p-4 rounded-lg text-red-600'>
          <p className='font-medium'>
            {submitError || 'Trabajador no encontrado'}
          </p>
          <button
            onClick={() => navigate('/')}
            className='mt-2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200'
          >
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4'
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className='text-2xl font-bold mb-6 flex items-center gap-3'>
        <span>Editar Trabajador</span>
        <span className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full'>
          {initialData.rut}
        </span>
      </h1>

      {submitError && (
        <div className='mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100'>
          <p className='font-medium'>{submitError}</p>
        </div>
      )}

      <WorkerForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={formLoading}
      />
    </div>
  );
}
