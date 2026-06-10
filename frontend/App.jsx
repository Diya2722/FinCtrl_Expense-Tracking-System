import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageUsers from "./admin/pages/ManageUsers";
import Reports from "./admin/pages/Reports";
import SystemRecords from "./admin/pages/SystemRecords";
import AdminRegister from "./admin/pages/AdminRegister";
import AdminForgotPassword from "./admin/pages/AdminForgotPassword";
import AdminResetPassword from "./admin/pages/AdminResetPassword";
import AdminLayout from "./admin/components/AdminLayout";
import Menubar from "./admin/components/Menubar";

import SelectRole from "./pages/SelectRole";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectRole />} />
          {/* <Route path="/" element={<Root/>}/> */}
          <Route path="/dashboard" element={<Home/>}/>
          <Route path="/income" element={<Income/>}/>
          <Route path="/expense" element={<Expense/>}/>
          <Route path="/category" element={<Category/>}/>
          <Route path="/filter" element={<Filter/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/update-password" element={<UpdatePassword/>}/>

          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="system" element={<SystemRecords />} />
          </Route>
        </Routes>

      </BrowserRouter>
      <Toaster/>
    </>
  );
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login"/>
  );
}

export default App;