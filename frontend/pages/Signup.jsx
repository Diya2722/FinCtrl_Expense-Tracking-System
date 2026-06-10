import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import API_ENDPOINTS from "../util/apiEndpoints";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import UploadProfileImage from "../util/uploadProfileImage";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Signup = () => {
    const { setUser } = useContext(AppContext);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        // basic validation
        if(!fullName.trim()) {
            setError("Please enter your fullname!");
            setIsLoading(false);
            return;
        }
        if(!validateEmail(email)) {
            setError("Please enter your valid email!");
            setIsLoading(false);
            return;
        }
        if(!password.trim()) {
            setError("Please enter your password!");
            setIsLoading(false);
            return;
        }
        setError("");
        // console.log(fullName, email, password);

        //signup api call
        // try {
        //     const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        //         fullName,
        //         email,
        //         password,
        //     })
        //     if(response.status === 201) {
        //         toast.success("Profile created successfullt.");
        //         navigate("/login");
        //     }
        try {
            if(profilePhoto) {
                const imageUrl = await UploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }
            const userData = {
                fullName,
                email,
                password,
                profileImageUrl
            };
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, userData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);

            toast.success("Profile created successfully.");
            navigate("/login");
        } catch(err) {
            console.error("Something went wrong!", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* bg img with blur*/}

            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full login-bg object-cover filter blur-sm" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2" >
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spending by joining with us.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
                        </div>
                        <Input 
                            value={fullName}
                            onChange = {(e) => setFullName(e.target.value)}
                            label = "Full Name"
                            placeholder = "e.g; John doe"
                            type = "text"
                        />
                        <div className="col-span-2">
                            <Input 
                                value={email}
                                onChange = {(e) => setEmail(e.target.value)}
                                label = "Email Address"
                                placeholder = "e.g; fullname@example.com"
                                type = "text"
                            />
                        </div>
                            
                           
                        <Input 
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                            label = "Password"
                            placeholder = "e.g; **********"
                            type = "password"
                        />
                           
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5">
                                        Signing Up...
                                    </LoaderCircle>
                                </>
                            ) : (
                                "SIGN UP"
                            )}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?
                            <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors"> Login </Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default Signup;
