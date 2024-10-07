const express = require("express");
const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const router = express.Router();

router
  // Method: GET
  // Access: PUBLIC
  // EndPoint: /api/v1/todos
  .get("/", getTodos)

  // Method: GET
  // Access: PUBLIC
  // EndPoint: /api/v1/todos/:id
  .get("/:id", getTodo)

  // Method: POST
  // Access: PUBLIC
  // EndPoint: /api/v1/todos
  .post("/", addTodo)

  // Method: PUT
  // Access: PUBLIC
  // EndPoint: /api/v1/todos/:id
  .put("/:id", updateTodo)

  // Method: DELETE
  // Access: PUBLIC
  // EndPoint: /api/v1/todos/:id
  .delete("/:id", deleteTodo);

module.exports = router;
