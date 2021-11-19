const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./data.json");
const middlewares = jsonServer.defaults({
  static: "./build",
});

// const express = require("express");
// const path = require("path");

const port = process.env.PORT;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);

// server.use(express.static(__dirname));
// server.use(express.static(path.join(__dirname, "build")));

// server.get("/ping", function (req, res) {
//   return res.send("pong");
// });

// server.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

server.listen(port);
