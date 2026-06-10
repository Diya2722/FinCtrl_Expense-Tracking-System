import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";

const serializeCategory = (category) => ({
  id: category._id.toString(),
  name: category.name,
  type: category.type,
  icon: category.icon || "",
  createdAt: category.createdAt,
  updatedAt: category.updatedAt,
});

export const getCategories = asyncHandler(async (req, res) => {
  const filter = { user: req.user._id };

  if (req.params.type) {
    filter.type = req.params.type;
  }

  const categories = await Category.find(filter).sort({ name: 1 });
  res.json(categories.map(serializeCategory));
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, type, icon = "" } = req.body;

  if (!name || !type) {
    res.status(400);
    throw new Error("Category name and type are required");
  }

  const duplicate = await Category.findOne({
    user: req.user._id,
    name: name.trim(),
    type,
  });

  if (duplicate) {
    res.status(409);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    user: req.user._id,
    name,
    type,
    icon,
  });

  res.status(201).json(serializeCategory(category));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const { name, type, icon = "" } = req.body;
  if (name) {
    category.name = name;
  }
  if (type) {
    category.type = type;
  }
  category.icon = icon;

  await category.save();

  res.json(serializeCategory(category));
});
