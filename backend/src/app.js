import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import filterRoutes from "./routes/filterRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Allow both localhost dev and deployed frontend origin
const allowedOrigins = [
  env.clientUrl,
  "http://localhost:5173",
  "http://localhost:4173",
  "https://finctrl-mtvl.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' not allowed`));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Expense backend is running" });
});

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", transactionRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", filterRoutes);
app.use("/api", adminRoutes);

// Serve frontend dist in production
const distPath = path.resolve(__dirname, "../../../dist");
app.use(express.static(distPath));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) next(); // dist not built yet in dev – that's fine
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
