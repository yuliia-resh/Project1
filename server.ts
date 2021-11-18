import express from "express";
// import favicon from "express-favicon";
import path from "path";
const port = process.env.port as string;

import { exec } from "child_process";

exec(
  "json-server --watch ./data.json",
  (error: any, data: any, getter: any) => {
    if (error) {
      console.log("error", error.message);
      return;
    }
    if (getter) {
      console.log("data", data);
      return;
    }
    console.log("data", data);
  }
);

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
// app.use(favicon(__dirname + "/build/favicon.ico"));

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
