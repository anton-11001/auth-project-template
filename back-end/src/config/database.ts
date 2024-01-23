import pg from "pg";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl === undefined || databaseUrl.length === 0) {
  throw new Error("DATABASE_URL is required");
}

export const databasePool = new Pool({
  connectionString: databaseUrl,
});

export const connectDatabase = async (): Promise<void> => {
  const client = await databasePool.connect();

  try {
    await client.query("SELECT 1");
  } finally {
    client.release();
  }
};
