import Transaction from "../models/Transaction.js";
import asyncHandler from "../utils/asyncHandler.js";

export const applyFilters = asyncHandler(async (req, res) => {
  const {
    type,
    startDate,
    endDate,
    sortOrder = "asc",
    sortField = "date",
    keyword = "",
  } = req.query;

  const filter = { user: req.user._id };

  if (type) {
    filter.type = type;
  }

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) {
      filter.date.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.date.$lte = new Date(`${endDate}T23:59:59.999Z`);
    }
  }

  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }

  const sort = {
    [sortField === "amount" ? "amount" : "date"]: sortOrder === "desc" ? -1 : 1,
  };

  const transactions = await Transaction.find(filter).sort(sort);

  res.json(
    transactions.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      amount: item.amount,
      date: item.date,
      icon: item.icon || "",
      type: item.type,
    })),
  );
});
