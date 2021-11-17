import mysql from "mysql";

export const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "admin",
});
