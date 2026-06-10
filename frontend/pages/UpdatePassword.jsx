import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import { LoaderCircle, ArrowLeft } from "lucide-react";
import { AppContext } from "../context/AppContext";
import API_ENDPOINTS from "../util/apiEndpoints";

const UpdatePassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // OTP Timer
    useEffect(() => {
        if (otpTimer > 0) {
            const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [otpTimer]);

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email.trim()) {
            setError("Please enter your email!");
            setIsLoading(false);
            return;
        }

        try {
            await axiosConfig.post(API_ENDPOINTS.REQUEST_PASSWORD_OTP, { email });
            setStep(2);
            setOtpTimer(300); // 5 minutes
            toast.success("OTP sent to your email!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!otp.trim() || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP!");
            setIsLoading(false);
            return;
        }

        try {
            await axiosConfig.post(API_ENDPOINTS.VERIFY_PASSWORD_OTP, { email, otp });
            setStep(3);
            toast.success("OTP verified!");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!newPassword.trim()) {
            setError("Please enter your new password!");
            setIsLoading(false);
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long!");
            setIsLoading(false);
            return;
        }
        if (!confirmPassword.trim()) {
            setError("Please confirm your new password!");
            setIsLoading(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            await axiosConfig.post(API_ENDPOINTS.CHANGE_PASSWORD_OTP, {
                email,
                otp,
                newPassword
            });
            setPasswordUpdated(true);
            toast.success("Password changed successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password");
        } finally {
            setIsLoading(false);
        }
    };

    if (passwordUpdated) {
        return (
            <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full login-bg object-cover filter blur-sm" />

                <div className="relative z-10 w-full max-w-lg px-6">
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-black mb-2">Password Changed!</h3>
                            <p className="text-sm text-slate-700 mb-8">
                                Your password has been updated successfully. Your account is now more secure.
                            </p>

                            <button 
                                onClick={() => navigate("/dashboard")}
                                className="w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full login-bg object-cover filter blur-sm" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        {step === 1 && "Change Password"}
                        {step === 2 && "Verify OTP"}
                        {step === 3 && "New Password"}
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        {step === 1 && "Enter your email to receive OTP"}
                        {step === 2 && "Enter the 6-digit OTP sent to your email"}
                        {step === 3 && "Enter your new password"}
                    </p>

                    {/* STEP 1: Email */}
                    {step === 1 && (
                        <form onSubmit={handleRequestOTP} className="space-y-4">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="e.g; your.email@example.com"
                                type="email"
                            />

                            {error && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </p>
                            )}

                            <button
                                disabled={isLoading}
                                className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                type="submit"
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Sending...
                                    </>
                                ) : "SEND OTP"}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: OTP */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">6-Digit OTP</label>
                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="000000"
                                    type="text"
                                    maxLength="6"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl letter-spacing-wide"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    OTP expires in: {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
                                </p>
                            </div>

                            {error && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </p>
                            )}

                            <button
                                disabled={isLoading}
                                className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                type="submit"
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Verifying...
                                    </>
                                ) : "VERIFY OTP"}
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="w-full py-2 text-sm text-gray-600 hover:text-gray-800"
                                type="button"
                            >
                                Change Email
                            </button>
                        </form>
                    )}

                    {/* STEP 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <Input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                label="New Password"
                                placeholder="e.g; ••••••••"
                                type="password"
                            />

                            <Input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                label="Confirm New Password"
                                placeholder="e.g; ••••••••"
                                type="password"
                            />

                            {error && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </p>
                            )}

                            <button
                                disabled={isLoading}
                                className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                type="submit"
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Updating...
                                    </>
                                ) : "UPDATE PASSWORD"}
                            </button>
                        </form>
                    )}

                    <p className="text-sm text-slate-800 text-center mt-6">
                        <Link to="/dashboard" className="inline-flex items-center gap-2 font-medium text-purple-600 underline hover:text-purple-700 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
