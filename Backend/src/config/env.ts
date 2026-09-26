
const required = (name: string): string => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. ` +
        `Copy Backend/.env.example to Backend/.env and fill it in.`,
    );
  }

  return value;
};

export const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);

if (!Number.isInteger(PORT) || PORT <= 0) {
  throw new Error(`PORT must be a positive integer, got "${process.env.PORT}"`);
}

export const MONGO_URI = required("MONGO_URI");
export const GEMINI_API_KEY = required("GEMINI_API_KEY");


export const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/** Public origin of this deployment, used by the MCP server to call back in. */
export const API_BASE_URL = process.env.API_BASE_URL ?? `http://127.0.0.1:${PORT}`;
