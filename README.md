# Cómo ejecutar el proyecto WorkerTrack (Frontend + Backend)

## Requisitos

- Node.js v16 o superior instalado
- PostgreSQL instalado y corriendo

---

## Pasos para la ejecución

### 1. Clona el proyecto y entra a la carpeta raíz
---

### 2. Crea la base de datos y la tabla manualmente (solo una vez)

1. Abre la consola de comandos (CMD o PowerShell).

2. Conéctate a PostgreSQL reemplazando `TU_USUARIO` por tu usuario real (por ejemplo, `postgres`):

```bash
psql -U TU_USUARIO -d postgres
```

3. Ingresa tu contraseña cuando se te solicite.

4. Dentro del prompt de PostgreSQL (deberías ver `postgres=#`), ejecuta estas 2 líneas una por una:

```sql
CREATE DATABASE workertrack;

\connect workertrack
```

5. Luego, crea la tabla `workers` pegando este bloque:

```sql
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
```

✅ ¡Listo! La base de datos `workertrack` y la tabla `workers` ya están creadas.

---

### 3. Configura el archivo `.env`

Edita el archivo `.env` ubicado en `/src/server/` y reemplaza `TU_USUARIO` y `TU_CONTRASEÑA` con tus credenciales de PostgreSQL:

```env
DATABASE_URL=postgresql://TU_USUARIO:TU_CONTRASEÑA@localhost:5432/workertrack
```

---

### 4. Instala las dependencias y ejecuta el proyecto

Ejecuta este comando en la raíz del proyecto para instalar todas las dependencias y levantar el servidor y el cliente:

```bash
npm install && cd src/client && npm install && cd ../../src/server && npm install && cd ../../ && npm run dev
```

---