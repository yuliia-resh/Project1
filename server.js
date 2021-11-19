const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();
const express = require("express");
const favicon = require("express-favicon");
const path = require("path");

const port = process.env.PORT;

const app = express();

server.use(middlewares);
server.use(router);
server.listen(port);

app.use(favicon(__dirname + "/build/favicon.ico"));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
