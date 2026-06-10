import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const useUser = () => {
    const { user, setUser, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        // No token → go login
        if (!token) {
            navigate("/login");
            return;
        }

        // User already in state → do nothing
        if (user) return;

        // Load user from localStorage
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            clearUser();
            navigate("/login");
        }
    }, [user, setUser, clearUser, navigate]);
};

export default useUser;






// import { useContext, useEffect } from "react";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const useUser = () => {
//     const { user, setUser, clearUser } = useContext(AppContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const storedUser = localStorage.getItem("user");

//         // ❌ No token → go login
//         if (!token) {
//             navigate("/login");
//             return;
//         }

//         // ✅ If user already in state → do nothing
//         if (user) return;

//         // ✅ Load user from localStorage
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             clearUser();
//             navigate("/login");
//         }
//     }, [user, setUser, clearUser, navigate]);
// };

// export default useUser;





// import { useEffect } from 'react';

// const useUser = () => {
//     useEffect(() => {
//         // You can add user authentication logic here
//         // For now, it's just a placeholder
//     }, []);
// };

// export default useUser;