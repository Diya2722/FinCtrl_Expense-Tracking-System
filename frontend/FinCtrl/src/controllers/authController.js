import User from "../models/User.js";
import Category from "../models/Category.js";
import Transaction from "../models/Transaction.js";
import OTP from "../models/OTP.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import randomToken from "../utils/randomToken.js";
import { sendOTP } from "../utils/emailService.js";
import { ensureDefaultCategories } from "../services/categoryService.js";

const sanitizeUser = (user) => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  profileImageUrl: user.profileImageUrl || "",
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, profileImageUrl = "" } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("Full name, email, and password are required");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    res.status(409);
    throw new Error("User already exists with this email");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    profileImageUrl,
  });

  await ensureDefaultCategories(user._id);

  res.status(201).json({
    message: "Account created successfully",
    token: generateToken({ userId: user._id, role: user.role }),
    user: sanitizeUser(user),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    message: "Login successful",
    token: generateToken({ userId: user._id, role: user.role }),
    user: sanitizeUser(user),
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() });

  if (!user) {
    res.status(404);
    throw new Error("No account found with this email address");
  }

  // Generate OTP instead of exposing a token
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OTP.deleteMany({ email: email.toLowerCase() });
  await OTP.create({ email: email.toLowerCase(), otp, purpose: "password_change" });

  const emailSent = await sendOTP(email, otp);
  if (!emailSent) {
    res.status(500);
    throw new Error("Failed to send OTP. Please try again.");
  }

  // Do NOT return the OTP or token in the response
  res.json({ message: "OTP sent to your email", email: user.email });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    res.status(400);
    throw new Error("Email, OTP, and new password are required");
  }

  const otpRecord = await OTP.findOne({
    email: email.toLowerCase(),
    otp: otp.toString(),
    purpose: "password_change",
    expiresAt: { $gt: new Date() },
  });

  if (!otpRecord) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) { res.status(404); throw new Error("User not found"); }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  await OTP.deleteOne({ _id: otpRecord._id });
  res.json({ message: "Password reset successfully" });
});

export const requestPasswordChangeOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Delete any existing OTP for this email
  await OTP.deleteMany({ email: email.toLowerCase() });

  // Save new OTP
  await OTP.create({
    email: email.toLowerCase(),
    otp,
    purpose: "password_change",
  });

  // Send OTP via email
  const emailSent = await sendOTP(email, otp);

  if (!emailSent) {
    res.status(500);
    throw new Error("Failed to send OTP. Please try again.");
  }

  res.json({ message: "OTP sent successfully to your email" });
});

export const verifyPasswordChangeOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400);
    throw new Error("Email and OTP are required");
  }

  const otpRecord = await OTP.findOne({
    email: email.toLowerCase(),
    otp: otp.toString(),
    purpose: "password_change",
    expiresAt: { $gt: new Date() },
  });

  if (!otpRecord) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  res.json({ message: "OTP verified successfully" });
});

export const changePasswordWithOTP = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    res.status(400);
    throw new Error("Email, OTP, and new password are required");
  }

  // Verify OTP
  const otpRecord = await OTP.findOne({
    email: email.toLowerCase(),
    otp: otp.toString(),
    purpose: "password_change",
    expiresAt: { $gt: new Date() },
  });

  if (!otpRecord) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.password = newPassword;
  await user.save();

  // Delete used OTP
  await OTP.deleteOne({ _id: otpRecord._id });

  res.json({ message: "Password changed successfully" });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Current password and new password are required");
  }

  if (!(await user.comparePassword(currentPassword))) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: "Password updated successfully" });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

export const adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password, profileImageUrl = "" } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const existingAdmin = await User.findOne({ email: email.toLowerCase() });
  if (existingAdmin) {
    res.status(409);
    throw new Error("Admin already exists with this email");
  }

  const admin = await User.create({
    fullName: name,
    email,
    password,
    profileImageUrl,
    role: "admin",
  });

  res.status(201).json({
    message: "Admin account created successfully",
    token: generateToken({ userId: admin._id, role: admin.role }),
    user: sanitizeUser(admin),
  });
});

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email: email?.toLowerCase(), role: "admin" });

  if (!admin || !(await admin.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid admin credentials");
  }

  res.json({
    message: "Admin login successful",
    token: generateToken({ userId: admin._id, role: admin.role }),
    user: sanitizeUser(admin),
  });
});

export const getAdminUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });

  res.json(
    users.map((user) => ({
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl || "",
      createdAt: user.createdAt,
    })),
  );
});

export const updateAdminUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: "user" });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, email } = req.body;
  if (name) {
    user.fullName = name;
  }
  if (email) {
    user.email = email.toLowerCase();
  }

  await user.save();

  res.json({
    message: "User updated successfully",
    user: {
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
    },
  });
});

export const deleteAdminUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: "user" });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await Promise.all([
    Category.deleteMany({ user: user._id }),
    Transaction.deleteMany({ user: user._id }),
    user.deleteOne(),
  ]);

  res.json({ message: "User deleted successfully" });
});
