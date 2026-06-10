// import AdminSidebar from "./AdminSidebar";
// import { AppContextProvider } from "../context/AppContext";
// // import { AdminContextProvider } from "../context/AppContext";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLayout = ({ children }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const admin = localStorage.getItem("admin");
//         const user = localStorage.getItem("user");
//         if (!admin && !user) {
//             navigate("/admin/login");
//         }
//     }, [navigate]);

//     return (
//         <AdminContextProvider>
//             <div className="flex bg-gray-100 min-h-screen">
//                 <AdminSidebar />
//                 <div className="flex-1 p-6">
//                     {children}
//                 </div>
//             </div>
//         </AdminContextProvider>
//     );
// };

// export default AdminLayout;



// import AdminSidebar from "./AdminSidebar";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContextProvider } from "../context/AppContext"; // ✅ correct

// const AdminLayout = ({ children }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const admin = localStorage.getItem("admin");

//         if (!admin) {
//             navigate("/admin/login");
//         }
//     }, [navigate]);

//     return (
//         <AppContextProvider> {/* ✅ wrap here */}
//             <div className="flex bg-gray-100 min-h-screen">
//                 <AdminSidebar />
//                 <div className="flex-1 p-6">
//                     {children}
//                 </div>
//             </div>
//         </AppContextProvider>
//     );
// };

// export default AdminLayout;



// import AdminSidebar from "./AdminSidebar";
// import Menubar from "./Menubar";
// import { Outlet } from "react-router-dom";

// const AdminLayout = () => {
//     return (
//         <div className="flex flex-col min-h-screen">

//             {/* Top Navbar */}
//             <Menubar />

//             <div className="flex flex-1">
                
//                 {/* Sidebar */}
//                 <AdminSidebar />

//                 {/* Page Content */}
//                 <div className="flex-1 p-6 bg-gray-100">
//                     <Outlet />
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default AdminLayout;



import AdminSidebar from "./AdminSidebar";
import Menubar from "./Menubar";
import { Outlet } from "react-router-dom";
import { AppContextProvider } from "../context/AppContext"; 

const AdminLayout = () => {
    return (
        <AppContextProvider> 
            <div className="flex flex-col min-h-screen">

                <Menubar />

                <div className="flex flex-1">
                    <AdminSidebar />

                    <div className="flex-1 p-6 bg-gray-100">
                        <Outlet />
                    </div>
                </div>

            </div>
        </AppContextProvider>
    );
};

export default AdminLayout;