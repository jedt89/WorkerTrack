import { useContext, useState } from 'react';
import { WorkersContext } from '../context/WorkersContext';
import WorkerCard from '../components/WorkerCard';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import { FaUserPlus, FaFileExport } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { workers, loading, error } = useContext(WorkersContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.rut.includes(searchTerm) ||
      worker.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter
      ? worker.department === departmentFilter
      : true;

    const matchesStatus =
      statusFilter !== 'all' ? worker.status === statusFilter : true;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setStatusFilter('all');
  };

  const handleExport = () => {
    // Implementar lógica de exportación
    alert('Exportando datos...');
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-4 bg-red-50 text-red-600 rounded-lg'>
        <p className='font-medium'>Error al cargar trabajadores:</p>
        <p>{error}</p>
        <button
          onClick={fetchWorkers}
          className='mt-2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200'
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Gestión de Trabajadores
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Administra los trabajadores de tu empresa
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-3 w-full md:w-auto'>
          {/* Barra de búsqueda */}
          <div className='relative flex-grow'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiSearch className='text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Buscar por nombre, RUT o cargo...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
              >
                <FiX className='text-gray-400 hover:text-gray-600' />
              </button>
            )}
          </div>

          {/* Botón para agregar nuevo */}
          <button
            onClick={() => navigate('/new')}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            <FaUserPlus /> Nuevo
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <div className='flex items-center gap-2'>
            <FiFilter className='text-gray-400' />
            <span className='text-sm font-medium text-gray-700'>
              Filtrar por:
            </span>
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm'
          >
            <option value=''>Todos los departamentos</option>
            <option value='Tecnología'>Tecnología</option>
            <option value='Diseño'>Diseño</option>
            <option value='RRHH'>Recursos Humanos</option>
            <option value='Operaciones'>Operaciones</option>
            <option value='Finanzas'>Finanzas</option>
            <option value='Marketing'>Marketing</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm'
          >
            <option value='all'>Todos los estados</option>
            <option value='active'>Activos</option>
            <option value='inactive'>Inactivos</option>
          </select>

          {(departmentFilter || statusFilter !== 'all' || searchTerm) && (
            <button
              onClick={clearFilters}
              className='flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <FiX /> Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Resumen y acciones */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className='text-sm text-gray-500'>
          Mostrando {filteredWorkers.length} de {workers.length} trabajadores
        </div>

        <div className='flex gap-3'>
          <button
            onClick={handleExport}
            className='flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm'
          >
            <FaFileExport /> Exportar
          </button>
        </div>
      </div>

      {/* Lista de trabajadores */}
      <div className='space-y-4'>
        {filteredWorkers.length === 0 ? (
          <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center'>
            <div className='mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <FiSearch className='text-gray-400 text-xl' />
            </div>
            <h3 className='font-medium text-gray-700'>
              No se encontraron trabajadores
            </h3>
            <p className='text-gray-500 mt-1'>
              {searchTerm || departmentFilter || statusFilter !== 'all'
                ? 'Prueba con otros criterios de búsqueda'
                : 'No hay trabajadores registrados aún'}
            </p>
            {!searchTerm && !departmentFilter && statusFilter === 'all' && (
              <button
                onClick={() => navigate('/new')}
                className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm'
              >
                Agregar primer trabajador
              </button>
            )}
          </div>
        ) : (
          filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))
        )}
      </div>
    </div>
  );
}
