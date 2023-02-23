import dotenv from "dotenv";
dotenv.config();

function env(envName: string, defaultValue: any = null) {
  const value = process.env[envName];

  if (!value && defaultValue === null)
    throw new Error(`env variable ${envName} is not set`);
  if (!value && defaultValue !== null) return defaultValue;

  if (typeof value === "string") {
    switch (value.trim().toLowerCase()) {
      case "false":
        return false;

      case "true":
        return true;
    }
  }

  return value;
}

export default env;
