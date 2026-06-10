import { Router } from "express";
import authenticate from "../middleware/auth.js";
import {
  forgotPassword,
  getProfile,
  login,
  register,
  resetPassword,
  updatePassword,
  requestPasswordChangeOTP,
  verifyPasswordChangeOTP,
  changePasswordWithOTP,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/request-password-otp", requestPasswordChangeOTP);
router.post("/verify-password-otp", verifyPasswordChangeOTP);
router.post("/change-password-otp", changePasswordWithOTP);
router.put("/update-password", authenticate, updatePassword);
router.get("/profile", authenticate, getProfile);

export default router;
