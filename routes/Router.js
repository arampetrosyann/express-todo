const express = require("express");
const router = express.Router();
const { remove, find } = require("lodash");
const generateUniqueId = require("../public/javascripts/helpers/generateUniqueId.helper");

const getId = generateUniqueId("do-");

router.get("/", (req, res) => {
  res.render("home", { list: req.session.todos });
});

router.get("/edit", (req, res) => {
  const todo = req.session.editTask;

  res.render("edit", { item: todo });
});

router
  .get("/todo/:id", (req, res) => {
    const todoId = req.params.id;

    const todo = find(req.session.todos, ["id", todoId]);

    req.session.editTask = todo;

    res.send(JSON.stringify(todo));
  })
  .post("/todo", (req, res) => {
    const { task } = req.body;
    const id = getId();

    const newTodo = { task, id };

    req.session.todos.push(newTodo);

    res.send(JSON.stringify(newTodo));
  })
  .put("/todo/:id", (req, res) => {
    const todoId = req.params.id;

    const todo = find(req.session.todos, ["id", todoId]);

    todo.task = req.body.editedTask;

    res.send(JSON.stringify(todo));
  })
  .delete("/todo/:id", (req, res) => {
    const todoId = req.params.id;

    const todo = find(req.session.todos, ["id", todoId]);

    remove(req.session.todos, (todo) => {
      return todo.id === todoId;
    });

    res.send(JSON.stringify(todo));
  });

module.exports = router;
