import { Pool } from "pg";

export const pg = new Pool({
  max: 20,
  connectionString: "postgres://admin:admin@localhost:5432/admin",
  idleTimeoutMillis: 30000,
});
