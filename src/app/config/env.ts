import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface IEnvConfig {
  NODE_ENV: "development" | "production";
  PORT: string;
  DATABASE_URL: string;

  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;

  BCRYPT_SALT_ROUND: string;

  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
}

const requiredEnvVars = [
  "NODE_ENV",
  "PORT",
  "DATABASE_URL",

  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES",

  "BCRYPT_SALT_ROUND",

  "SUPER_ADMIN_EMAIL",
  "SUPER_ADMIN_PASSWORD",
];

const loadEnv = (): IEnvConfig => {
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

export const envVars = loadEnv();
