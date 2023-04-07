const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  console.log(req.body);
  res.json("res");
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen("http://195.140.146.182/", () => console.log("server start"));
