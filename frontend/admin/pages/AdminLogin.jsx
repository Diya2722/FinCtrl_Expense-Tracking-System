// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import React from 'react';
// import { images } from '../assets/assets';

// const AdminLogin = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();

//         const storedAdmin = JSON.parse(localStorage.getItem("adminData"));

//         if (
//             storedAdmin &&
//             email === storedAdmin.email &&
//             password === storedAdmin.password
//         ) {
//             localStorage.setItem("admin", true);
//             navigate("/admin/dashboard");
//         } else {
//             alert("Invalid Credentials");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//             <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96">

//                 <h2 className="text-2xl font-bold mb-2 text-center">Admin Login</h2>

//                 <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full mb-4 p-3 border rounded-lg"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="w-full mb-4 p-3 border rounded-lg"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />

//                 <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
//                     Login
//                 </button>

//                 <p className="text-sm text-center mt-4">
//                     New Admin?{" "}
//                     <span
//                         onClick={() => navigate("/admin/register")}
//                         className="text-purple-600 cursor-pointer"
//                     >
//                         SignUp
//                     </span>
//                 </p>

//             </form>
//         </div>
//     );
// };

// export default AdminLogin;








import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { images  } from '../assets/assets';
import login_bg from "../assets/login_bg.jpg";
import axiosConfig from "../../util/axiosConfig";
import API_ENDPOINTS from "../../util/apiEndpoints";
import toast from "react-hot-toast";


const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADMIN_LOGIN, {
                email,
                password
            });

            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("adminToken", response.data.token);
            localStorage.setItem("admin", "true");
            window.location.href = "/admin/dashboard";
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">

            <img 
                src={login_bg} 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover blur-sm" 
            />

            <form onSubmit={handleLogin} className="relative bg-white p-8 rounded-xl shadow-md w-96">

                <h2 className="text-2xl font-bold mb-2 text-center">Admin Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-3 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
                    Login
                </button>

                <p className="text-sm text-center mt-4">
                    New Admin?{" "}
                    <span
                        onClick={() => navigate("/admin/register")}
                        className="text-purple-600 cursor-pointer"
                    >
                        SignUp
                    </span>
                </p>
                <p className="text-sm text-center mt-2">
                    <span
                        onClick={() => navigate("/admin/forgot-password")}
                        className="text-purple-600 cursor-pointer hover:underline"
                    >
                        Forgot Password?
                    </span>
                </p>

            </form>
        </div>
    );

};

export default AdminLogin;
