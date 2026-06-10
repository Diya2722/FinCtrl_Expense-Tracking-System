import { Router } from "express";
import authenticate from "../middleware/auth.js";
import { applyFilters } from "../controllers/filterController.js";

const router = Router();

router.get("/filter", authenticate, applyFilters);

export default router;
