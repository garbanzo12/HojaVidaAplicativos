import express from "express";
import {
  obtenerResumenDashboard,
} from "../controllers/infogeneral.js";

const router = express.Router();


router.get("/", obtenerResumenDashboard);

export default router;
