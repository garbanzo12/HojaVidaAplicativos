import express from 'express';
import { createMatrizEscalamiento,getMatriz, getMatrizById,updateEstadomatriz,getMatrizGlobal,updateEstadomatrizGlobal,updateMatriz} from '../controllers/matriz_escalamiento.js';
import { validate } from "../validators/validateMiddleware.js";
import { matrizSchema } from "../validators/matrizValidator.js";
const router = express.Router();

// ✅ Rutas
router.post('/', validate(matrizSchema), createMatrizEscalamiento);
router.get('/global', getMatrizGlobal);
router.get('/', getMatriz);
router.put('/:id', validate(matrizSchema), updateMatriz);
router.put('/estado-global/:id', updateEstadomatrizGlobal);
router.put('/estado/:id', updateEstadomatriz);
router.get('/:id', getMatrizById);

export default router;
