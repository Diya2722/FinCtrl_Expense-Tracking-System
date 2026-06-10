import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import asyncHandler from "../utils/asyncHandler.js";

const serializeTransaction = (transaction) => ({
  id: transaction._id.toString(),
  name: transaction.name,
  amount: transaction.amount,
  date: transaction.date,
  icon: transaction.icon || "",
  type: transaction.type,
  createdAt: transaction.createdAt,
});

export const getDashboardData = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort({
    date: -1,
    createdAt: -1,
  });

  const income = transactions.filter((item) => item.type === "income");
  const expense = transactions.filter((item) => item.type === "expense");

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);

  res.json({
    totalBalance: totalIncome - totalExpense,
    totalIncome,
    totalExpense,
    RecentTransaction: transactions.slice(0, 5).map(serializeTransaction),
    recent5Income: income.slice(0, 5).map(serializeTransaction),
    recent5Expenses: expense.slice(0, 5).map(serializeTransaction),
  });
});

export const getAdminReports = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find().sort({ date: 1 });

  const byMonth = new Map();
  let totalIncome = 0;
  let totalExpense = 0;

  for (const item of transactions) {
    const month = item.date.toLocaleString("en-US", { month: "short" });
    const current = byMonth.get(month) || { month, Income: 0, Expense: 0 };

    if (item.type === "income") {
      current.Income += item.amount;
      totalIncome += item.amount;
    } else {
      current.Expense += item.amount;
      totalExpense += item.amount;
    }

    byMonth.set(month, current);
  }

  res.json({
    incomeExpenseData: Array.from(byMonth.values()),
    pieData: [
      { name: "Income", value: totalIncome },
      { name: "Expense", value: totalExpense },
    ],
  });
});

export const getSystemRecords = asyncHandler(async (req, res) => {
  const [transactionCount, userCount] = await Promise.all([
    Transaction.countDocuments(),
    User.countDocuments(),
  ]);

  const systemUsage = Math.min(
    100,
    Math.round((transactionCount * 2 + userCount * 5) / 10),
  );

  res.json({
    users: userCount,
    transactions: transactionCount,
    systemUsage,
    serverTime: new Date().toISOString(),
    status: "healthy",
  });
});
