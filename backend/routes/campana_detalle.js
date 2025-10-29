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
router.get("/", testConnection);
router.get("/campanas", getCampanas);
router.get("/campanas/:id", getCampanaById);
router.post("/campanas", createCampana);
router.delete("/campanas/:id", deleteCampana);

export default router;
