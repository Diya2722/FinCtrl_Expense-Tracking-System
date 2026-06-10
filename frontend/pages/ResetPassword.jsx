// ResetPassword.jsx is no longer needed as a separate page.
// The full forgot-password → OTP → reset flow now lives entirely in ForgotPassword.jsx.
// This file is kept as a redirect so any old bookmarked /reset-password URLs
// are gracefully sent to /forgot-password.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/forgot-password", { replace: true });
    }, [navigate]);

    return null;
};

export default ResetPassword;