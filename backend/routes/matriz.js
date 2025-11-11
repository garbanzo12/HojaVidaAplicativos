import express from 'express';
import { createMatrizEscalamiento,getMatriz, getMatrizById,updateEstadomatriz} from '../controllers/matriz_escalamiento.js';

const router = express.Router();

// ✅ Rutas
router.post('/', createMatrizEscalamiento);
router.get('/', getMatriz);
router.put('/estado/:id', updateEstadomatriz);
router.get('/:id', getMatrizById);

export default router;
