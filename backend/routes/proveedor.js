import express from 'express';
import { createAplicativoProveedor,getProveedor, getProveedorById } from '../controllers/aplicativo_proveedor.js';

const router = express.Router();

// ✅ Rutas
router.post('/', createAplicativoProveedor);
router.get('/', getProveedor);
router.get('/:id', getProveedorById);

export default router;
