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
            localStorage.removeItem("user");
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





//    import { createContext, useState } from "react";

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {

//     const [user, setUser] = useState(() => {
//         const storedUser = localStorage.getItem("user");
//         return storedUser ? JSON.parse(storedUser) : null;
//     });

//     const clearUser = () => {
//         setUser(null);
//         localStorage.removeItem("user"); // optional but good
//     };

//     return (
//         <AppContext.Provider value={{ user, setUser, clearUser }}>
//             {children}
//         </AppContext.Provider>
//     );
// };