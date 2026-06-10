export const BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const CLOUDINARY_CLOUD_NAME = "dmhkxhoc5";

const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_REGISTER: "/admin/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  UPDATE_PASSWORD: "/update-password",
  REQUEST_PASSWORD_OTP: "/request-password-otp",
  VERIFY_PASSWORD_OTP: "/verify-password-otp",
  CHANGE_PASSWORD_OTP: "/change-password-otp",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  GET_ALL_INCOME: "/income",
  ADD_INCOME: "/income",
  UPDATE_INCOME: (incomeId) => `/income/${incomeId}`,
  DELETE_INCOME: (incomeId) => `/income/${incomeId}`,
  GET_ALL_EXPENSE: "/expense",
  ADD_EXPENSE: "/expense",
  UPDATE_EXPENSE: (expenseId) => `/expense/${expenseId}`,
  DELETE_EXPENSE: (expenseId) => `/expense/${expenseId}`,
  INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
  EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense",
  EMAIL_INCOME: "/email/income-excel",
  APPLY_FILTERS: "/filter",
  DASHBOARD_DATA: "/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_BY_ID: (userId) => `/admin/users/${userId}`,
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_DASHBOARD: "/admin/system-records",
  ADMIN_SYSTEM_RECORDS: "/admin/system-records",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};

export default API_ENDPOINTS;
