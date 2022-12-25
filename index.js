const express = require("express");

const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send("<h2>hello world</h2>");
});

app.get("/hello", (req, res) => {
  res.send("<h2>hi hello route</h2>");
});

app.listen(port, () => console.log("running..."));
