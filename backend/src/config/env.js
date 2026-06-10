import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve .env from backend root regardless of cwd
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
const emailUser = process.env.EMAIL_USER || "";
const emailPassword = process.env.EMAIL_PASSWORD || "";

if (!mongoUri) {
  throw new Error("MONGO_URI is required in environment variables.");
}

if (!jwtSecret) {
  throw new Error("JWT_SECRET is required in environment variables.");
}

export const env = {
  port,
  clientUrl,
  mongoUri,
  jwtSecret,
  jwtExpiresIn,
  emailUser,
  emailPassword,
};
