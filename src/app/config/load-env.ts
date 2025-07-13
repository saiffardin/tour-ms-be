import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface IEnvConfig {
  NODE_ENV: "dev" | "prod";
  PORT: string;
  DATABASE_URL: string;
}

export const loadEnv = (): IEnvConfig => {
  const requiredEnvVars = ["NODE_ENV", "PORT", "DATABASE_URL"];

  let envVars = {};

  requiredEnvVars.forEach((key) => {
    if (!process.env?.[key]) {
      throw new Error(`Missing required ENV variable : ${key}`);
    }

    envVars = {
      ...envVars,
      [key]: process.env?.[key],
    };
  });

  return envVars as IEnvConfig;
};
