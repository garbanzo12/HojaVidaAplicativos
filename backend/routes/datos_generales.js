import express from 'express';
import { getDatosGenerales, getDatosGeneralesById } from '../controllers/datos_generales.js';

const router = express.Router();

// ✅ Rutas
router.get('/', getDatosGenerales);
router.get('/:id', getDatosGeneralesById);

export default router;
