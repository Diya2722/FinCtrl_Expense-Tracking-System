import Category from "../models/Category.js";

const defaults = [
  { name: "Salary", type: "income", icon: "" },
  { name: "Freelance", type: "income", icon: "" },
  { name: "Bonus", type: "income", icon: "" },
  { name: "Utilities", type: "expense", icon: "" },
  { name: "Groceries", type: "expense", icon: "" },
  { name: "Transport", type: "expense", icon: "" },
];

export const ensureDefaultCategories = async (userId) => {
  const existingCount = await Category.countDocuments({ user: userId });

  if (existingCount > 0) {
    return;
  }

  await Category.insertMany(
    defaults.map((item) => ({
      ...item,
      user: userId,
    })),
  );
};
