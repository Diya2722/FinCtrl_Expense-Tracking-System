import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import { LoaderCircle, ArrowLeft } from "lucide-react";
import API_ENDPOINTS from "../util/apiEndpoints";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // step 1 = enter email, step 2 = enter otp, step 3 = new password
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [otpTimer, setOtpTimer] = useState(0);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordReset, setPasswordReset] = useState(false);

    const navigate = useNavigate();

    // ── Start OTP countdown ──────────────────────────────────────────────────
    const startTimer = () => {
        setOtpTimer(600); // 10 minutes
        const interval = setInterval(() => {
            setOtpTimer(prev => {
                if (prev <= 1) { clearInterval(interval); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    // ── STEP 1: Send OTP to email ────────────────────────────────────────────
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Please enter a valid email address!");
            return;
        }

        setIsLoading(true);
        try {
            await axiosConfig.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
            setStep(2);
            startTimer();
            toast.success("OTP sent to your email!");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // ── STEP 2: Verify OTP ───────────────────────────────────────────────────
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError("");

        if (!otp.trim() || otp.length !== 6) {
            setError("Please enter the valid 6-digit OTP!");
            return;
        }

        setIsLoading(true);
        try {
            await axiosConfig.post(API_ENDPOINTS.VERIFY_PASSWORD_OTP, { email, otp });
            setStep(3);
            toast.success("OTP verified!");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired OTP.");
        } finally {
            setIsLoading(false);
        }
    };

    // ── STEP 3: Set new password ─────────────────────────────────────────────
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");

        if (!newPassword.trim()) {
            setError("Please enter your new password!");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        try {
            await axiosConfig.post(API_ENDPOINTS.RESET_PASSWORD, { email, otp, newPassword });
            setPasswordReset(true);
            toast.success("Password reset successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // ── Success screen ───────────────────────────────────────────────────────
    if (passwordReset) {
        return (
            <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full login-bg object-cover filter blur-sm" />
                <div className="relative z-10 w-full max-w-lg px-6">
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 text-center">
                        <h3 className="text-2xl font-semibold text-black mb-2">Password Reset Successful!</h3>
                        <p className="text-sm text-slate-700 mb-8">
                            Your password has been reset. You can now log in with your new password.
                        </p>
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Step titles / subtitles ──────────────────────────────────────────────
    const titles = {
        1: { heading: "Forgot Password?",  sub: "Enter your email and we'll send you an OTP to reset your password." },
        2: { heading: "Verify OTP",        sub: `Enter the 6-digit OTP sent to ${email}` },
        3: { heading: "Set New Password",  sub: "Enter and confirm your new password below." },
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full login-bg object-cover filter blur-sm" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

                    {/* Step indicator */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`h-2 rounded-full transition-all duration-300 ${s === step ? "w-8 bg-purple-600" : s < step ? "w-4 bg-purple-400" : "w-4 bg-gray-200"}`} />
                        ))}
                    </div>

                    <h3 className="text-2xl font-semibold text-black text-center mb-2">{titles[step].heading}</h3>
                    <p className="text-sm text-slate-700 text-center mb-8">{titles[step].sub}</p>

                    {/* ── STEP 1 ── */}
                    {step === 1 && (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="e.g; your.email@example.com"
                                type="email"
                            />
                            {error && <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
                            <button
                                disabled={isLoading}
                                className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                                type="submit"
                            >
                                {isLoading ? <><LoaderCircle className="animate-spin w-5 h-5" /> Sending...</> : "SEND OTP"}
                            </button>
                            <p className="text-sm text-slate-800 text-center mt-4">
                                Remember your password?
                                <Link to="/login" className="font-medium text-purple-600 underline hover:text-purple-700 transition-colors"> Login</Link>
                            </p>
                        </form>
                    )}

                    {/* ── STEP 2 ── */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">6-Digit OTP</label>
                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    placeholder="000000"
                                    type="text"
                                    maxLength="6"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest"
                                />
                                {otpTimer > 0 ? (
                                    <p className="text-xs text-gray-500 mt-2">
                                        OTP expires in: {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, "0")}
                                    </p>
                                ) : (
                                    <p className="text-xs text-red-500 mt-2">OTP expired. <button type="button" onClick={() => { setStep(1); setOtp(""); }} className="underline text-purple-600">Resend OTP</button></p>
                                )}
                            </div>
                            {error && <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
                            <button
                                disabled={isLoading}
                                className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                                type="submit"
                            >
                                {isLoading ? <><LoaderCircle className="animate-spin w-5 h-5" /> Verifying...</> : "VERIFY OTP"}
                            </button>
                            <button type="button" onClick={() => { setStep(1); setOtp(""); setError(""); }} className="w-full py-2 text-sm text-gray-600 hover:text-gray-800">
                                ← Change Email
                            </button>
                        </form>
                    )}

                    {/* ── STEP 3 ── */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
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
                            {error && <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
                            <button
                                disabled={isLoading}
                                className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
                                type="submit"
                            >
                                {isLoading ? <><LoaderCircle className="animate-spin w-5 h-5" /> Resetting...</> : "RESET PASSWORD"}
                            </button>
                        </form>
                    )}

                    <p className="text-sm text-slate-800 text-center mt-6">
                        <Link to="/login" className="inline-flex items-center gap-2 font-medium text-purple-600 underline hover:text-purple-700 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;