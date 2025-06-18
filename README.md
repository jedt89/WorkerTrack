# Tabla de Contenidos

# Cómo ejecutar el proyecto WorkerTrack (Frontend + Backend)

Requisitos: Node.js v16 o superior instalado y PostgreSQL instalado y funcionando.

Pasos:

# Clona el proyecto y entra a la carpeta raíz:

# Crea la base de datos y tabla manualmente (este proceso se hace una sola vez):
Abre una terminal (cmd o bash) y conecta a PostgreSQL con tu usuario (reemplaza 'TU_USUARIO' por tu usuario real de postgres):

psql -U TU_USUARIO -d postgres

Luego copia y pega este bloque completo para crear las tablas:

\set ON_ERROR_STOP off
CREATE DATABASE workertrack;
\set ON_ERROR_STOP on
\connect workertrack

CREATE TABLE workers (
id SERIAL PRIMARY KEY,
full_name TEXT NOT NULL,
rut TEXT NOT NULL,
phone TEXT,
email TEXT,
role TEXT NOT NULL,
department TEXT,
status TEXT DEFAULT 'active'
);

# Modifica el archivo .env que se encuentra en la ruta /src/server/ y reemplaza usuario y contraseña:
DATABASE_URL=postgresql://TU_USUARIO:TU_CONTRASEÑA@localhost:5432/workertrack

# Instala las dependencias backend y frontend con esta línea:
npm install && cd src/client && npm install && cd ../../src/server && npm install && cd ../../ && npm run dev


# Notas importantes:

PostgreSQL debe estar corriendo antes de iniciar el backend.

TU_USUARIO debe tener permisos para crear bases y tablas.

Cambia el puerto en .env si es necesario.

El paso 3 solo se debe hacer la primera vez o para reinstalar la base de datos.