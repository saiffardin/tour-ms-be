/* eslint-disable no-console */
import app from "./app";
import mongoose from "mongoose";
import { Server } from "http";
import { envVars } from "./app/config";

let server: Server;

async function bootstrap() {
  try {
    const { DATABASE_URL, PORT } = envVars;

    await mongoose.connect(DATABASE_URL);

    console.log("--------------------------------");
    console.log("Mongoose Connected.");

    server = app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT} `);
    });
  } catch (error) {
    console.log("Failed to connect Mongoose.");
    console.error(error);
  }
}

bootstrap();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally exit process or log error

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally exit process or log error

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.error("Unhandled Rejection at:");
  // Optionally exit process or log error

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
