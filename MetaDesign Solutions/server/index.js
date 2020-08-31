const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRouter = require("./api/index");
const bodyParser = require("body-parser");
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer(app);

mongoose.connect("mongodb://127.0.0.1:27017/metadesign5", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", apiRouter);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
module.exports = server;
