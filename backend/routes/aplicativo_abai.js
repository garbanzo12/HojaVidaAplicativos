import express from 'express';
import { createAplicativoAbai,getAplicativoabai, getAplicativoabaiById } from '../controllers/aplicativo_abai.js';

const router = express.Router();

// ✅ Rutas
router.post('/', createAplicativoAbai);
router.get('/', getAplicativoabai);
router.get('/:id', getAplicativoabaiById);

export default router;
