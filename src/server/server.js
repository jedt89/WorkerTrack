import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import workersRoutes from './routes/workersRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/workers', workersRoutes);

// Middleware de error
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
