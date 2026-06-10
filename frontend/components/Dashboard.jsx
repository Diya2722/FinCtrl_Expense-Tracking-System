// import { useContext } from "react";
// import Menubar from "./Menubar";
// import { AppContext } from "../context/AppContext";
// import Sidebar from "./Sidebar";

// const Dashboard = () => {

//     const {user} = useContext(AppContext);

//     return (
//         <div>
//             <Menubar/>

//             {/* {user && ( */}
//                 <div className="flex">
//                     <div className="max-[1080px]:hidden">
//                         {/* side bar content */}
//                         <Sidebar />
//                     </div>

//                     <div className="grow mx-5">
//                         right side content
//                     </div>
//                 </div>
//             {/* )} */}
//         </div>
//     )
// }
// export default Dashboard;




// import { Children, useContext } from "react";
import { useContext } from "react";
import Menubar from "./Menubar";
// import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";

const Dashboard = ({children, activeMenu}) => {

    const {user} = useContext(AppContext);

    return (
        <div>
            <Menubar activeMenu={activeMenu}/>

            {user && (
                <div className="flex">
                    <div className="hidden lg:block">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>

                    <div className="grow mx-5">
                        {children}
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default Dashboard;