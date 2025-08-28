import express from "express";
import dotenv from "dotenv";
import logger from "../config/logger.config.js";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import cors from "cors";

import { fileURLToPath } from 'url';
import bodyParser from "body-parser"
import swaggerDocs from "../config/swagger.js";
import routes from "./routes/index.js";

// Determine the environment and load the corresponding .env file
const env = process.env.NODE_ENV || "development";
const envFile = `.env.${env}`;
// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", envFile) });

// Define the global __basedir variable for use in other modules
global.__basedir = path.resolve(__dirname, "..");
console.log("Base directory set to:", global.__basedir);

// Create an Express app
const app = express();

app.use(cors());

const jsonParser = bodyParser.json();
app.use(jsonParser);

// Use Helmet middleware
app.use(helmet());

const port = process.env.PORT || 3000;

// Morgan middleware for logging requests
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Serve uploaded files from resources/static directory
app.use(
  "/resources/static",
  express.static(path.join(__basedir, "/resources/static"))
);

app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

app.use("/api/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  swaggerDocs(app, port);
});
