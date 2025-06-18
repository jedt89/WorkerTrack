import {
  FaEdit,
  FaTrash,
  FaUserTie,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { WorkersContext } from '../context/WorkersContext';
import { useNavigate, Link } from 'react-router-dom';

export default function WorkerCard({ worker }) {
  const { deleteWorker } = useContext(WorkersContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (
      window.confirm(
        `¿Estás seguro de eliminar a ${worker.full_name}? Esta acción no se puede deshacer.`
      )
    ) {
      const { success, message } = await deleteWorker(worker.id);
      if (!success) alert(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'
    >
      <div className='flex items-start gap-4'>
        <div className='bg-blue-100 p-3 rounded-full'>
          <FaUserTie className='text-blue-600 text-xl' />
        </div>

        <div className='flex-grow'>
          <div className='flex justify-between items-start'>
            <h3 className='font-semibold text-lg'>{worker.full_name}</h3>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                worker.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {worker.status === 'active' ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <div className='flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm'>
            <span className='text-gray-600'>RUT: {worker.rut}</span>
            <span className='text-gray-600'>Cargo: {worker.role}</span>
            {worker.department && (
              <span className='px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs'>
                {worker.department}
              </span>
            )}
          </div>

          {(worker.phone || worker.email) && (
            <div className='mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-4'>
              {worker.phone && (
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <FaPhone className='text-gray-400' />
                  <span>{worker.phone}</span>
                </div>
              )}
              {worker.email && (
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <FaEnvelope className='text-gray-400' />
                  <a
                    href={`mailto:${worker.email}`}
                    className='hover:text-blue-600'
                  >
                    {worker.email}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => navigate(`/edit/${worker.id}`)}
            className='p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors'
            title='Editar'
            aria-label='Editar trabajador'
          >
            <FaEdit />
          </button>
          <button
            onClick={handleDelete}
            className='p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors'
            title='Eliminar'
            aria-label='Eliminar trabajador'
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
