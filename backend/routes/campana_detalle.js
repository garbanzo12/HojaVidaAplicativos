import express from "express";
import {
  testConnection,
  getCampanas,
  getCampanaById,
  createCampana,
  deleteCampana,
} from "../controllers/campana_detalle.js";

const router = express.Router();

// Rutas
router.get("/", getCampanas);
router.get("/:id", getCampanaById);
router.post("/", createCampana);
router.delete("/:id", deleteCampana);

export default router;
