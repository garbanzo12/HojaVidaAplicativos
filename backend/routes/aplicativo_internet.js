import express from 'express';
import { createAplicativoInternet,getAplicativoInternet, getAplicativoInternetById } from '../controllers/aplicativos_internet.js';

const router = express.Router();

// ✅ Rutas
router.post('/', createAplicativoInternet);
router.get('/', getAplicativoInternet);
router.get('/:id', getAplicativoInternetById);

export default router;
