import pool from '../models/db.js';

// Obtener todos los trabajadores
export const getAllWorkers = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM workers ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Obtener un trabajador por ID
export const getWorkerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM workers WHERE id = $1', [
      id
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trabajador no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Crear nuevo trabajador
export const createWorker = async (req, res, next) => {
  try {
    const { full_name, rut, phone, email, role, department, status } = req.body;
    const result = await pool.query(
      `INSERT INTO workers (full_name, rut, phone, email, role, department, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [full_name, rut, phone, email, role, department, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Actualizar trabajador
export const updateWorker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, rut, phone, email, role, department, status } = req.body;

    const result = await pool.query(
      `UPDATE workers SET full_name=$1, rut=$2, phone=$3, email=$4, role=$5, department=$6, status=$7
       WHERE id=$8 RETURNING *`,
      [full_name, rut, phone, email, role, department, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trabajador no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Eliminar trabajador
export const deleteWorker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM workers WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trabajador no encontrado' });
    }

    res.json({ message: 'Trabajador eliminado' });
  } catch (err) {
    next(err);
  }
};
