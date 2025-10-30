import express from 'express';
import { getGestores, getGestoresById } from '../controllers/gestores_campana.js';

const router = express.Router();

// ✅ Rutas
router.get('/', getGestores);
router.get('/:id', getGestoresById);

export default router;
