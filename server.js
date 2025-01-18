const express = require("express");
const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const db = require("./models");
db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log("Mongoose connected thru MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to database, Reason:", err);
    process.exit();
  });

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", require("./routes"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
