import { Router } from "express";
import authenticate from "../middleware/auth.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const router = Router();

router.get("/dashboard", authenticate, getDashboardData);

export default router;
