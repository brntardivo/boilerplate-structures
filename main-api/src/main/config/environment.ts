import env from "@utils/env";

export const NODE_ENV = env("NODE_ENV", "development");
export const API_NAME = env("API_NAME", "main-api");
export const API_URL = env("API_URL", "http://localhost");
export const API_PORT = env("API_PORT", 8000);

export const DB_TYPE = env("DB_TYPE", "postgre");
export const DB_HOST = env("DB_HOST", "localhost");
export const DB_PORT = env("DB_PORT", 5432);
export const DB_USERNAME = env("DB_USERNAME", "postgres");
export const DB_PASSWORD = env("DB_PASSWORD", "postgres");
export const DB_DATABASE = env("DB_DATABASE", "boilerplate");

export const JWT_SECRET = env("JWT_SECRET");
export const TTL = env("TTL", 2880);

export const MAIL_MOCK = env("MAIL_MOCK", "");
export const MAIL_FROM_ADDRESS = env("MAIL_FROM_ADDRESS", "no-reply@email.com");
export const MAIL_FROM_NAME = env("MAIL_FROM_NAME", "app");
export const MAIL_HOST = env("MAIL_HOST", "smtp.email.com");
export const MAIL_PORT = env("MAIL_PORT", 587);
export const MAIL_USERNAME = env("MAIL_USERNAME", "user");
export const MAIL_PASSWORD = env("MAIL_PASSWORD", "pass");
export const MAIL_ENCRYPTION = env("MAIL_ENCRYPTION", "tls");
