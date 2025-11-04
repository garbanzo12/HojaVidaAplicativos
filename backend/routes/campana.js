import express from "express";
import {
  
  getCampanas,
  getCampanaById,
  createCampana,
  deleteCampana,
  updateCampana,
} from "../controllers/campana.js";

const router = express.Router();

// Rutas
router.get("/", getCampanas);
router.get("/:id", getCampanaById);
router.post("/", createCampana);
router.put("/:id", updateCampana);
router.delete("/:id", deleteCampana);

export default router;
