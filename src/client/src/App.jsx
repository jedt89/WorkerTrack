import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { WorkersProvider } from './context/WorkersContext';
import Home from './pages/Home';
import NewWorker from './pages/NewWorker';
import EditWorker from './pages/EditWorker';
import './App.css';

function App() {
  return (
    <WorkersProvider>
      <BrowserRouter>
        <div className='min-h-screen bg-gray-50 flex flex-col'>
          {/* Navbar */}
          <header className='bg-white shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
              <Link
                to='/'
                className='text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors'
              >
                WorkerTrack
              </Link>
              <nav className='flex items-center space-x-6'>
                <Link
                  to='/'
                  className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
                >
                  Inicio
                </Link>
                <Link
                  to='/new'
                  className='flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  <span>Nuevo Trabajador</span>
                </Link>
              </nav>
            </div>
          </header>

          {/* Contenido Principal */}
          <main className='flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<NewWorker />} />
              <Route path='/edit/:id' element={<EditWorker />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className='bg-white py-6 text-center text-gray-500 text-sm border-t'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex flex-col md:flex-row justify-between items-center'>
                <p>
                  © {new Date().getFullYear()} WorkerTrack - Sistema de Gestión de
                  Trabajadores
                </p>
                <div className='flex space-x-4 mt-4 md:mt-0'>
                  <a href='#' className='hover:text-blue-600 transition-colors'>
                    Términos
                  </a>
                  <a href='#' className='hover:text-blue-600 transition-colors'>
                    Privacidad
                  </a>
                  <a href='#' className='hover:text-blue-600 transition-colors'>
                    Contacto
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </WorkersProvider>
  );
}

export default App;
