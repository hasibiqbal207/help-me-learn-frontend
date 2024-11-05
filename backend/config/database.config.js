import mysql from "mysql2";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from "path";

// dotenv.config();

// Determine the environment and load the corresponding .env file
const env = process.env.NODE_ENV || "development";
const envFile = `.env.${env}`;
// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", envFile) });

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
  console.log("Database connected");
});

// Export the connection object for use in other parts of the application
export default connection;
