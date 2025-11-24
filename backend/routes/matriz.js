import express from 'express';
import { createMatrizEscalamiento,getMatriz, getMatrizById,updateEstadomatriz,updateMatriz} from '../controllers/matriz_escalamiento.js';
import { createMatrizEscalamientoGlobal,getMatrizGlobal,updateMatrizGlobal,updateEstadomatrizGlobal,getMatrizGlobalById } from '../controllers/matriz_escalamientoGlobal.js';
import { validate } from "../validators/validateMiddleware.js";
import { matrizSchema } from "../validators/matrizValidator.js";
import { matrizGlobalSchema } from "../validators/matrizGlobalValidator.js";
const router = express.Router();

// ✅ Rutas
router.post('/', validate(matrizSchema), createMatrizEscalamiento);

router.post('/global', validate(matrizGlobalSchema), createMatrizEscalamientoGlobal);

router.get('/global', getMatrizGlobal);

router.get('/', getMatriz);

router.put('/:id', validate(matrizSchema), updateMatriz);

router.put('/global/:id', validate(matrizGlobalSchema), updateMatrizGlobal);

router.put('/estado-global/:id',  updateEstadomatrizGlobal);

router.put('/estado/:id', updateEstadomatriz);

router.get('/:id', getMatrizById);

router.get('/global/:id', getMatrizGlobalById);

export default router;
