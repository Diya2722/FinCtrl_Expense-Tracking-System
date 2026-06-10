import { Router } from "express";
import authenticate from "../middleware/auth.js";
import {
  createExpense,
  createIncome,
  deleteExpense,
  deleteIncome,
  downloadExpenseCsv,
  downloadIncomeCsv,
  emailIncomePlaceholder,
  getExpense,
  getIncome,
  updateExpense,
  updateIncome,
} from "../controllers/transactionController.js";

const router = Router();

router.get("/income", authenticate, getIncome);
router.post("/income", authenticate, createIncome);
router.put("/income/:id", authenticate, updateIncome);
router.delete("/income/:id", authenticate, deleteIncome);

router.get("/expense", authenticate, getExpense);
router.post("/expense", authenticate, createExpense);
router.put("/expense/:id", authenticate, updateExpense);
router.delete("/expense/:id", authenticate, deleteExpense);

router.get("/excel/download/income", authenticate, downloadIncomeCsv);
router.get("/excel/download/expense", authenticate, downloadExpenseCsv);
router.get("/email/income-excel", authenticate, emailIncomePlaceholder);

export default router;
