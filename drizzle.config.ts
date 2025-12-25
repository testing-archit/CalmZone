import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true, // Enable verbose logging
  strict: true,  // Strict mode for better error detection
} satisfies Config;
