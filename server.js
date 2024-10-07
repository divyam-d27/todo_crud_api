const express = require("express");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

// connecting DB
const connectDB = require("./db_config.js");
connectDB();

// body-parser middleware
app.use(express.json());
// for urlencoded json request body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Welcome to TODO_CRUD API 1.0",
  });
});

app.use("/api/v1/todos", require("./routes/todoRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
