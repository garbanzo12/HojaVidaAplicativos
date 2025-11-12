import express from 'express';
import { createMatrizEscalamiento,getMatriz, getMatrizById,updateEstadomatriz,getMatrizGlobal,updateEstadomatrizGlobal} from '../controllers/matriz_escalamiento.js';

const router = express.Router();

// ✅ Rutas
router.post('/', createMatrizEscalamiento);
router.get('/global', getMatrizGlobal);
router.get('/', getMatriz);
router.put('/estado-global/:id', updateEstadomatrizGlobal);
router.put('/estado/:id', updateEstadomatriz);
router.get('/:id', getMatrizById);

export default router;
