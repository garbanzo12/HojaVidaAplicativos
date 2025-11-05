import express from "express";
import {
  
  getCampanas,
  getCampanaById,
  createCampana,
  deleteCampana,
  updateCampana,
} from "../controllers/campana.js";
import { campanaSchema } from "../validators/campanaValidator.js";
import { validate } from "../validators/validateMiddleware.js";

const router = express.Router();

// Rutas
router.get("/", getCampanas);
router.get("/:id", getCampanaById);
router.post("/",validate(campanaSchema), createCampana);
router.put("/:id",validate(campanaSchema), updateCampana);
router.delete("/:id", deleteCampana);

export default router;
