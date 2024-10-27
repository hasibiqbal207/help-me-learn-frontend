import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  insecureAuth: true,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

// Open the connection
connection.connect((err) => {
  console.log(process.env.DATABASE_HOST);

  if (err) {
    throw err;
  }
  console.log("Connected to the database as id " + connection.threadId);
  console.log("Database connected");
});

// Export the connection object for use in other parts of the application
export default connection;
