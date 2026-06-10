import { useNavigate } from "react-router-dom";

const SelectRole = () => {
    const navigate = useNavigate();

    return (
        <div 
            className="flex flex-col items-center justify-center h-screen text-center"
            style={{
                background: "linear-gradient(328deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)"
            }}
        >

            {/* Welcome Text */}
            <div className="mb-8 text-white px-4">
                <h1 className="text-8xl font-bold mb-3 text-gray-700">
                    Welcome to FinCtrl 
                </h1>
                {/* <p className="text-lg max-w-md mx-auto opacity-90"> */}
                <p className="text-lg text-pink-900">
                    Simple tracking, smart budgeting, secure future.
                </p>
            </div>
            
            {/* Card */}
            <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-[350px]">
                
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Select Login Type
                </h2>

                <div className="flex flex-col gap-4">

                    <button
                        onClick={() => navigate("/login")}
                        className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
                    >
                        Login as User
                    </button>

                    <button
                        onClick={() => navigate("/admin/login")}
                        className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200 shadow-md"
                    >
                        Login as Admin
                    </button>

                </div>

            </div>

        </div>
    );
};

export default SelectRole;