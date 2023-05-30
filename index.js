const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

app.use(
  "/",
  express.static(path.resolve(__dirname, "client"), { extensions: ["js"] })
);
const indexPath = path.join(__dirname, "client", "index.html");

app.get("*", function (req, res) {
  res.sendFile(indexPath);
});

app.listen(80, () => console.log("server start"));
