import { Router } from "express";
import authenticate from "../middleware/auth.js";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/categories", authenticate, getCategories);
router.get("/categories/:type", authenticate, getCategories);
router.post("/categories", authenticate, createCategory);
router.put("/categories/:id", authenticate, updateCategory);

export default router;
