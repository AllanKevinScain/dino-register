import { createConnection, ConnectionConfig } from "mysql";

const connectionUri: ConnectionConfig = {
  host: "localhost",
  database: "crud",
  password: "root",
  user: "root",
  port: 3306,
};

export const db = createConnection(connectionUri);
