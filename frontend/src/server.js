import app from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDb();
    const server = app.listen(env.port, () => {
      console.log(`Backend server running on http://localhost:${env.port}`);
    });

    // Handle EADDRINUSE gracefully
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `\n❌ Port ${env.port} is already in use.\n` +
          `👉 Fix: Kill the process using port ${env.port}, or set a different PORT in your .env file.\n` +
          `   Windows: netstat -ano | findstr :${env.port}  then  taskkill /PID <pid> /F\n` +
          `   Mac/Linux: lsof -ti:${env.port} | xargs kill -9\n`
        );
        process.exit(1);
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.error("Failed to start backend", error);
    process.exit(1);
  }
};

startServer();
