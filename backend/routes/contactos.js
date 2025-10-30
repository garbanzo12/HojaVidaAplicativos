import express from 'express';
import { getContactos, getContactosById } from '../controllers/contactos.js';

const router = express.Router();

// ✅ Rutas
router.get('/', getContactos);
router.get('/:id', getContactosById);

export default router;
