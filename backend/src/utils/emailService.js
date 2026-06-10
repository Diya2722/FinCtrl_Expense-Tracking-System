import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// Build transporter lazily so missing config doesn't crash on import
const createTransporter = () => {
  if (!env.emailUser || !env.emailPassword) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.emailUser,
      pass: env.emailPassword,
    },
  });
};

export const sendOTP = async (email, otp) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.error("Email transporter not configured. Check EMAIL_USER and EMAIL_PASSWORD in .env");
    return false;
  }

  try {
    const mailOptions = {
      from: `"FinCtrl" <${env.emailUser}>`,
      to: email,
      subject: "Your OTP for Password Change – FinCtrl",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
          <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 36px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="text-align:center; margin-bottom: 24px;">
              <h1 style="color: #0088cc; font-size: 28px; margin: 0;">FinCtrl</h1>
              <p style="color: #555; margin-top: 4px;">Expense Tracking System</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin-bottom: 24px;">
            <p style="color: #333; font-size: 16px;">Hi there,</p>
            <p style="color: #555; font-size: 15px;">Use the OTP below to change your password. It expires in <strong>10 minutes</strong>.</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; background: #f0f8ff; border: 2px dashed #0088cc; border-radius: 8px; padding: 16px 40px; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #0055aa;">${otp}</span>
            </div>
            <p style="color: #999; font-size: 13px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
    return false;
  }
};

export const verifyEmailConfig = () => {
  if (!env.emailUser || !env.emailPassword) {
    console.warn("⚠️  Email configuration missing. Set EMAIL_USER and EMAIL_PASSWORD in .env");
    return false;
  }
  return true;
};
