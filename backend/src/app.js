// Imports from Packages
import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import path from 'path'
import http from 'http'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
// Imports from Files
import routes from './routes/index.js'


const app = express()
const server = http.createServer(app)

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv config
dotenv.config();

const port = 3000;


const jsonParser = bodyParser.json();
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

app.use(
  "/resources/static",
  express.static(path.join(__dirname, "resources/static"))
);

app.use(cors());
app.use(jsonParser);
app.use("/api/", routes);
global.__basedir = __dirname;

server.listen(port, () => {
    console.log(`Help Me Learn API listening at http://localhost:${port}`);
});
  