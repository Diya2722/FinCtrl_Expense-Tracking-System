import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    // const [user, setUser] = useState(null);

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const clearUser = () => {
        setUser(null);
    }


    const contextValue ={
        user,
        setUser,
        clearUser
    }


    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}





// import { createContext, useState, useEffect } from "react";

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {

//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);

//     const clearUser = () => {
//         setUser(null);
//     };

//     return (
//         <AppContext.Provider value={{ user, setUser, clearUser }}>
//             {children}
//         </AppContext.Provider>
//     );
// };