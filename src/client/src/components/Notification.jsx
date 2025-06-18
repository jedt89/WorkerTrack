import { useContext } from 'react';
import { WorkersContext } from '../context/WorkersContext';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

export default function Notification() {
  const { notification, setNotification } = useContext(WorkersContext);

  if (!notification) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg border ${
        notification.type === 'success'
          ? 'bg-green-50 text-green-800 border-green-100'
          : 'bg-red-50 text-red-600 border-red-100'
      }`}
    >
      <div className='flex items-start gap-3 max-w-xs'>
        <div className='mt-0.5'>
          {notification.type === 'success' ? (
            <FaCheckCircle className='text-xl' />
          ) : (
            <FaTimesCircle className='text-xl' />
          )}
        </div>
        <div className='flex-grow'>
          <p className='font-medium'>{notification.message}</p>
        </div>
        <button
          onClick={() => setNotification(null)}
          className='p-1 hover:opacity-70'
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
