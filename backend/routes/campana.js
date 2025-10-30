import express from 'express';
import { getCampanas, getCampanaById } from '../controllers/campana.js';

const router = express.Router();

// ✅ Rutas
router.get('/', getCampanas);
router.get('/:id', getCampanaById);

export default router;
