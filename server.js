const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const port = process.env.PORT;

const { exec } = require("child_process");

exec("json-server --watch ./data.json", (error, data, getter) => {
  if (error) {
    console.log("error", error.message);
    return;
  }
  if (getter) {
    console.log("data", data);
    return;
  }
  console.log("data", data);
});

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
app.use(favicon(__dirname + "/build/favicon.ico"));

//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

//простой тест сервера
app.get("/ping", function (req, res) {
  return res.send("pong");
});

//обслуживание html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port || 3001);
