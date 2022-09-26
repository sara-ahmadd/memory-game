const express = require("express");
const path = require("path");

const app = express();

let port = 8000;


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});


app.use(express.static(path.join(__dirname, "./dist")));


app.listen(port, "localhost", () => {
  console.log(`Server Is Running On Port : ${port}`);
});
