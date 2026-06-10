import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import login_bg from "../assets/login_bg.jpg";
import axiosConfig from "../../util/axiosConfig";
import API_ENDPOINTS from "../../util/apiEndpoints";

const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Enter your email");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      localStorage.setItem("resetToken", response.data.resetToken);
      localStorage.setItem("resetEmail", response.data.email);
      toast.success(`Reset link sent to ${email}`);
      navigate("/admin/reset-password");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
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
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 mt-4"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default AdminForgotPassword;
