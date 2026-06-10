import { useNavigate, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { images } from "../assets/assets";
import { AppContext } from "../context/AppContext";

import { User } from "lucide-react";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, clearUser } = useContext(AppContext);

    const menu = [
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Manage Users", path: "/admin/users" },
        { label: "Reports", path: "/admin/reports" },
        { label: "System Records", path: "/admin/system" }
    ];

    const handleLogout = () => {
        clearUser();
        localStorage.removeItem("admin");
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <div className="w-64 bg-white shadow-md p-5 flex flex-col">

           

            <h2 className="text-xl font-bold text-purple-700 text-center mb-6">
                Admin Panel
            </h2>

            {/* Admin Profile */}
            <div className="flex flex-col items-center gap-2 mb-6">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="admin"
                        className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                ) : (
                    <User className="w-16 h-16 text-gray-400" />
                )}

                <p className="text-sm font-medium text-gray-800">
                    {user?.fullName || "Admin User"}
                </p>
            </div>

            {/* Menu */}
            <div className="space-y-3 flex-1">
                {menu.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition 
                        ${
                            location.pathname === item.path
                                ? "bg-purple-600 text-white"
                                : "text-gray-700 hover:bg-purple-100"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default AdminSidebar;



// import { useNavigate, useLocation } from "react-router-dom";
// import React, { useContext } from "react";
// import { images } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import { User } from "lucide-react";

// const AdminSidebar = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const { user } = useContext(AppContext); // 👈 get logged-in admin

//     const menu = [
//         { label: "Dashboard", path: "/admin/dashboard" },
//         { label: "Manage Users", path: "/admin/users" },
//         { label: "Reports", path: "/admin/reports" },
//         { label: "System Records", path: "/admin/system" }
//     ];

//     return (
//         <div className="w-64 bg-white shadow-md p-5 flex flex-col">

//             {/* Logo */}
//             <img src={images.logo} alt="Admin Logo" className="w-20 mb-4 rounded-full mx-auto" />

//             <h2 className="text-xl font-bold text-purple-700 text-center mb-6">
//                 Admin Panel
//             </h2>

//             {/* 👤 Admin Profile */}
//             <div className="flex flex-col items-center gap-2 mb-6">
//                 {user?.profileImageUrl ? (
//                     <img
//                         src={user.profileImageUrl}
//                         alt="admin"
//                         className="w-16 h-16 rounded-full object-cover border"
//                     />
//                 ) : (
//                     <User className="w-16 h-16 text-gray-400" />
//                 )}

//                 <p className="text-sm font-medium text-gray-800">
//                     {user?.fullName || "Admin User"}
//                 </p>
//             </div>

//             {/* Menu */}
//             <div className="space-y-3">
//                 {menu.map((item, index) => (
//                     <button
//                         key={index}
//                         onClick={() => navigate(item.path)}
//                         className={`w-full text-left px-4 py-3 rounded-lg transition 
//                         ${
//                             location.pathname === item.path
//                                 ? "bg-purple-600 text-white"
//                                 : "text-gray-700 hover:bg-purple-100"
//                         }`}
//                     >
//                         {item.label}
//                     </button>
//                 ))}
//             </div>

//         </div>
//     );
// };

// export default AdminSidebar;




