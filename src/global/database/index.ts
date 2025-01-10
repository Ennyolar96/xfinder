import dotenv from "dotenv";
import knex, { Knex } from "knex";

dotenv.config();

export * from "./models";
export const db: Knex = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    tableName: "knex_migrations",
    extension: "ts",
  },
});
