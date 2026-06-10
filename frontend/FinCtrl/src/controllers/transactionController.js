import Category from "../models/Category.js";
import Transaction from "../models/Transaction.js";
import asyncHandler from "../utils/asyncHandler.js";
import { toCsv } from "../utils/csv.js";

const serializeTransaction = (transaction) => ({
  id: transaction._id.toString(),
  name: transaction.name,
  amount: transaction.amount,
  date: transaction.date,
  icon: transaction.icon || "",
  type: transaction.type,
  categoryId: transaction.category?._id?.toString() || transaction.category?.toString(),
  category: transaction.category?._id
    ? {
        id: transaction.category._id.toString(),
        name: transaction.category.name,
        type: transaction.category.type,
      }
    : undefined,
  createdAt: transaction.createdAt,
  updatedAt: transaction.updatedAt,
});

const ensureCategory = async (userId, categoryId, type) =>
  Category.findOne({
    _id: categoryId,
    user: userId,
    type,
  });

const getTransactionsByType = async (req, res, type) => {
  const transactions = await Transaction.find({
    user: req.user._id,
    type,
  })
    .populate("category")
    .sort({ date: -1, createdAt: -1 });

  res.json(transactions.map(serializeTransaction));
};

const createTransactionByType = async (req, res, type) => {
  const { name, amount, date, icon = "", categoryId } = req.body;

  if (!name || !amount || !date || !categoryId) {
    res.status(400);
    throw new Error("Name, amount, date, and category are required");
  }

  const category = await ensureCategory(req.user._id, categoryId, type);
  if (!category) {
    res.status(400);
    throw new Error("Selected category is invalid");
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    category: category._id,
    type,
    name,
    amount: Number(amount),
    date,
    icon,
  });

  await transaction.populate("category");
  res.status(201).json(serializeTransaction(transaction));
};

const updateTransactionByType = async (req, res, type) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user._id,
    type,
  }).populate("category");

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  const category = await ensureCategory(
    req.user._id,
    req.body.categoryId || transaction.category._id,
    type,
  );

  if (!category) {
    res.status(400);
    throw new Error("Selected category is invalid");
  }

  transaction.name = req.body.name ?? transaction.name;
  transaction.amount = Number(req.body.amount ?? transaction.amount);
  transaction.date = req.body.date ?? transaction.date;
  transaction.icon = req.body.icon ?? transaction.icon;
  transaction.category = category._id;

  await transaction.save();
  await transaction.populate("category");

  res.json(serializeTransaction(transaction));
};

const deleteTransactionByType = async (req, res, type) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user._id,
    type,
  });

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  await transaction.deleteOne();
  res.json({ message: `${type} deleted successfully` });
};

export const getIncome = asyncHandler(async (req, res) => {
  await getTransactionsByType(req, res, "income");
});

export const createIncome = asyncHandler(async (req, res) => {
  await createTransactionByType(req, res, "income");
});

export const updateIncome = asyncHandler(async (req, res) => {
  await updateTransactionByType(req, res, "income");
});

export const deleteIncome = asyncHandler(async (req, res) => {
  await deleteTransactionByType(req, res, "income");
});

export const getExpense = asyncHandler(async (req, res) => {
  await getTransactionsByType(req, res, "expense");
});

export const createExpense = asyncHandler(async (req, res) => {
  await createTransactionByType(req, res, "expense");
});

export const updateExpense = asyncHandler(async (req, res) => {
  await updateTransactionByType(req, res, "expense");
});

export const deleteExpense = asyncHandler(async (req, res) => {
  await deleteTransactionByType(req, res, "expense");
});

export const downloadIncomeCsv = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    user: req.user._id,
    type: "income",
  })
    .populate("category")
    .sort({ date: -1 });

  const csv = toCsv(
    transactions.map((item) => ({
      name: item.name,
      category: item.category?.name || "",
      amount: item.amount,
      date: item.date.toISOString().slice(0, 10),
    })),
    [
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "amount", label: "Amount" },
      { key: "date", label: "Date" },
    ],
  );

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="income-details.csv"');
  res.send(csv);
});

export const downloadExpenseCsv = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    user: req.user._id,
    type: "expense",
  })
    .populate("category")
    .sort({ date: -1 });

  const csv = toCsv(
    transactions.map((item) => ({
      name: item.name,
      category: item.category?.name || "",
      amount: item.amount,
      date: item.date.toISOString().slice(0, 10),
    })),
    [
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "amount", label: "Amount" },
      { key: "date", label: "Date" },
    ],
  );

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="expense-details.csv"');
  res.send(csv);
});

export const emailIncomePlaceholder = asyncHandler(async (req, res) => {
  res.json({
    message:
      "Income export email is ready for integration. Hook this endpoint to your mail provider when needed.",
  });
});
