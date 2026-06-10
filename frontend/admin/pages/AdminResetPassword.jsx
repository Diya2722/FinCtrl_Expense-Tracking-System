import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import login_bg from "../assets/login_bg.jpg";
import axiosConfig from "../../util/axiosConfig";
import API_ENDPOINTS from "../../util/apiEndpoints";

const AdminResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error("Enter both password fields");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axiosConfig.post(API_ENDPOINTS.RESET_PASSWORD, {
        email: localStorage.getItem("resetEmail"),
        token: localStorage.getItem("resetToken"),
        newPassword: password
      });
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetToken");
      toast.success("Password reset successfully!");
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img 
          src={login_bg} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover blur-sm" 
      />
      <form className="relative bg-white p-10 rounded-2xl shadow-md w-[400px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mt-4"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default AdminResetPassword;
