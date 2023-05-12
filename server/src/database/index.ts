import { Pool } from "pg";
import config from "../config";

const Client = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
});

Client.on("error", (error: Error) => {
  console.error(`Error: ${error.message}`);
});

export default Client;
