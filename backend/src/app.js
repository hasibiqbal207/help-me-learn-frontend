// Imports from Packages

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const dotenv = require('dotenv')

const app = express()
const server = http.createServer(app)

// dotenv config
dotenv.config();

const port = 8080;

// Imports from Files
const routes = require('./routes/index.js')

server.listen(port, () => {
    console.log(`Help Me Learn API listening at http://localhost:${port}`);
});
  