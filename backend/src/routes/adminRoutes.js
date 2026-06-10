import { Router } from "express";
import authenticate, { requireAdmin } from "../middleware/auth.js";
import {
  adminLogin,
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
} from "../controllers/authController.js";
import {
  getAdminReports,
  getSystemRecords,
} from "../controllers/dashboardController.js";

const router = Router();

// Admin login only - registration is disabled (admin account is pre-created)
router.post("/admin/login", adminLogin);

router.use(authenticate, requireAdmin);
router.get("/admin/users", getAdminUsers);
router.put("/admin/users/:id", updateAdminUser);
router.delete("/admin/users/:id", deleteAdminUser);
router.get("/admin/reports", getAdminReports);
router.get("/admin/system-records", getSystemRecords);

export default router;
