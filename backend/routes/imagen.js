import express from 'express';
import { getImagenes, getImagenesById } from '../controllers/imagen.js';

const router = express.Router();

// ✅ Rutas
router.get('/', getImagenes);
router.get('/:id', getImagenesById);

export default router;
