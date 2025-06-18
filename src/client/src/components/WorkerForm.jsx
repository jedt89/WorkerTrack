import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaExclamationCircle } from 'react-icons/fa';

export default function WorkerForm({ initialData, onSubmit, loading = false }) {
  const [formData, setFormData] = useState(
    initialData || {
      full_name: '',
      rut: '',
      phone: '',
      email: '',
      role: '',
      department: '',
      status: 'active'
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar errores al editar
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateRut = (rut) => {
    if (!/^[\d.-kK]+$/.test(rut)) return false;

    // Validación básica de formato RUT chileno
    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (cleanRut.length < 2) return false;

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    // Validar que el cuerpo sean solo números
    if (!/^\d+$/.test(body)) return false;

    // Validar dígito verificador
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body.charAt(i)) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const calculatedDv = 11 - (sum % 11);
    const expectedDv =
      calculatedDv === 11
        ? '0'
        : calculatedDv === 10
        ? 'K'
        : calculatedDv.toString();

    return dv === expectedDv;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Nombre es obligatorio';
    } else if (formData.full_name.length < 3) {
      newErrors.full_name = 'Nombre debe tener al menos 3 caracteres';
    }

    // if (!formData.rut.trim()) {
    //   newErrors.rut = 'RUT es obligatorio';
    // } else if (!validateRut(formData.rut)) {
    //   newErrors.rut = 'RUT inválido';
    // }

    if (formData.phone && !/^[\d\s+-]+$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Cargo es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-2xl mx-auto'>
      <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
        <h2 className='text-lg font-semibold text-gray-800 mb-6'>
          Información Personal
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Nombre Completo */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Nombre Completo *
            </label>
            <div className='relative'>
              <input
                type='text'
                name='full_name'
                value={formData.full_name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.full_name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder='Ej: Juan Pérez González'
              />
              {errors.full_name && (
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  <FaExclamationCircle className='text-red-500' />
                </div>
              )}
            </div>
            {errors.full_name && (
              <p className='mt-1 text-sm text-red-600'>{errors.full_name}</p>
            )}
          </div>

          {/* RUT */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              RUT *
            </label>
            <div className='relative'>
              <input
                type='text'
                name='rut'
                value={formData.rut}
                onChange={handleChange}
                placeholder='12345678-9'
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.rut
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.rut && (
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  <FaExclamationCircle className='text-red-500' />
                </div>
              )}
            </div>
            {errors.rut && (
              <p className='mt-1 text-sm text-red-600'>{errors.rut}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Teléfono
            </label>
            <div className='relative'>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='+56 9 8765 4321'
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.phone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.phone && (
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  <FaExclamationCircle className='text-red-500' />
                </div>
              )}
            </div>
            {errors.phone && (
              <p className='mt-1 text-sm text-red-600'>{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <div className='relative'>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='ejemplo@empresa.com'
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.email && (
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  <FaExclamationCircle className='text-red-500' />
                </div>
              )}
            </div>
            {errors.email && (
              <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
        <h2 className='text-lg font-semibold text-gray-800 mb-6'>
          Información Laboral
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Cargo */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Cargo *
            </label>
            <div className='relative'>
              <input
                type='text'
                name='role'
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.role
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder='Ej: Desarrollador Frontend'
              />
              {errors.role && (
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                  <FaExclamationCircle className='text-red-500' />
                </div>
              )}
            </div>
            {errors.role && (
              <p className='mt-1 text-sm text-red-600'>{errors.role}</p>
            )}
          </div>

          {/* Departamento */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Departamento
            </label>
            <select
              name='department'
              value={formData.department}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Seleccionar departamento</option>
              <option value='Tecnología'>Tecnología</option>
              <option value='Diseño'>Diseño</option>
              <option value='RRHH'>Recursos Humanos</option>
              <option value='Operaciones'>Operaciones</option>
              <option value='Finanzas'>Finanzas</option>
              <option value='Marketing'>Marketing</option>
              <option value='Ventas'>Ventas</option>
              <option value='Soporte'>Soporte</option>
            </select>
          </div>
        </div>

        {/* Estado (Activo/Inactivo) */}
        <div className='flex items-center gap-4 pt-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Estado *
          </label>
          <div className='flex gap-4'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                name='status'
                value='active'
                checked={formData.status === 'active'}
                onChange={handleChange}
                className='text-blue-600 focus:ring-blue-500'
              />
              <span className='ml-2'>Activo</span>
            </label>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                name='status'
                value='inactive'
                checked={formData.status === 'inactive'}
                onChange={handleChange}
                className='text-blue-600 focus:ring-blue-500'
              />
              <span className='ml-2'>Inactivo</span>
            </label>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className='flex justify-end gap-4 pt-6'>
        <button
          type='button'
          onClick={() => window.history.back()}
          className='px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Cancelar
        </button>
        <button
          type='submit'
          disabled={loading}
          className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <span className='flex items-center justify-center gap-2'>
              <svg
                className='animate-spin h-4 w-4 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Guardando...
            </span>
          ) : initialData ? (
            'Actualizar Trabajador'
          ) : (
            'Guardar Trabajador'
          )}
        </button>
      </div>
    </form>
  );
}

WorkerForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
