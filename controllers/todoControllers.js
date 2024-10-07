const expressAsyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");

// GET ALL TODOS

const getTodos = expressAsyncHandler(async (req, res) => {
  const todos = await Todo.find();

  if (!todos) {
    res.status(404).json({
      message: "There is a problem while getting your todos.",
    });
    throw new Error("There is a problem while getting your todos.");
  }

  if (todos.length === 0) {
    res.status(200).json({ message: "No todos.", todos });

    throw new Error("No todos found.");
  }

  res.status(200).json({
    message: "Successfully fetched todos",
    todos,
  });
});

// GET SINGLE TODO

const getTodo = expressAsyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json({
      message: "Todo Does Not Exist!",
    });
    throw new Error("Todo Does Not Exist!");
  }
  res.status(200).json({
    todo,
  });
});

// ADD NEW TODO

const addTodo = expressAsyncHandler(async (req, res) => {
  const { title, description, author, isPublished } = req.body;
  if (!title || !description || !author) {
    res.status(401).json({
      message: "Please provide all fields",
    });
    throw new Error("Please provide all fields");
  }
  const newTodo = await Todo.create({
    title,
    description,
    author,
    isPublished,
  });

  if (!newTodo) {
    res.status(401).json({
      message: "Could not create todo. Something went wrong",
    });

    throw new Error("Could not create todo. Something went wrong");
  }

  res.status(201).json({
    message: "Successfully created todo",
    todo: newTodo,
  });
});

// UPDATE TODO

const updateTodo = expressAsyncHandler(async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedTodo) {
    return res.status(401).json({
      message: "Something went wrong",
    });
  }

  res.status(201).json({
    message: "Successfully updated todo",
    updatedTodo,
  });
});

// DELETE TODO

const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Successfully Deleted todo" });
};

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
