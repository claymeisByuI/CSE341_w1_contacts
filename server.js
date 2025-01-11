/* eslint-env node */
const express = require("express");
const app = express();

const mongodb = require("./data/database");

const port = process.env.PORT || 8080;

app.use("/", require("./routes"));

mongodb.initDb((err, db) => {
  if (err) {
    console.error("Database not running", err);
  } else {
    console.log("MongoDB Connected");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
