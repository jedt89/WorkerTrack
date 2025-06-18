import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkersContext } from '../context/WorkersContext';
import WorkerForm from '../components/WorkerForm';
import api from '../services/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function NewWorker() {
  const { fetchWorkers } = useContext(WorkersContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setSubmitError(null);
    try {
      await api.post('/workers', formData);
      await fetchWorkers();
      navigate('/', {
        state: { successMessage: 'Trabajador creado correctamente' }
      });
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          err.message ||
          'Error al crear trabajador'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4'
      >
        <FaArrowLeft /> Volver
      </button>

      <h1 className='text-2xl font-bold mb-6'>Agregar Trabajador</h1>

      {submitError && (
        <div className='mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100'>
          <p className='font-medium'>{submitError}</p>
        </div>
      )}

      <WorkerForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
