import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminRegister = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Admin registration is disabled. Admin login only.");
    navigate("/admin/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to admin login...</p>
    </div>
  );
};

export default AdminRegister;
