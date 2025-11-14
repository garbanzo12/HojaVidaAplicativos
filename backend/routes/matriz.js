import express from 'express';
import { createMatrizEscalamiento,createMatrizEscalamientoGlobal,getMatriz, getMatrizById,getMatrizGlobalById,updateEstadomatriz,getMatrizGlobal,updateEstadomatrizGlobal,updateMatriz,updateMatrizGlobal} from '../controllers/matriz_escalamiento.js';
import { validate } from "../validators/validateMiddleware.js";
import { matrizSchema } from "../validators/matrizValidator.js";
const router = express.Router();

// ✅ Rutas
router.post('/', validate(matrizSchema), createMatrizEscalamiento);

router.post('/global', validate(matrizSchema), createMatrizEscalamientoGlobal);

router.get('/global', getMatrizGlobal);

router.get('/', getMatriz);

router.put('/:id', validate(matrizSchema), updateMatriz);

router.put('/global/:id', validate(matrizSchema), updateMatrizGlobal);

router.put('/estado-global/:id', updateEstadomatrizGlobal);

router.put('/estado/:id', updateEstadomatriz);

router.get('/:id', getMatrizById);

router.get('/global/:id', getMatrizGlobalById);

export default router;
