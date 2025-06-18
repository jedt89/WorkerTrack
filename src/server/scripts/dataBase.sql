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
