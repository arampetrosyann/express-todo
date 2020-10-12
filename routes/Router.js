const express = require("express");
const router = express.Router();
const { remove, find } = require("lodash");
const generateUniqueId = require("../public/javascripts/helpers/generateUniqueId.helper");

const getId = generateUniqueId("do-");

router
  .get("/", (req, res) => {
    res.render("home", { list: req.session.todos });
  })
  .post("/", (req, res) => {
    const { task } = req.body;
    const id = getId();

    const newTodo = { task, id };

    req.session.todos.push(newTodo);

    res.redirect("/");
  })
  .delete("/", (req, res) => {
    remove(req.session.todos, (todo) => {
      return todo.id === req.body.id;
    });

    res.end();
  });

router
  .get("/edit", (req, res) => {
    const todo = req.session.editTask;

    res.render("edit", { inputValue: todo });
  })
  .post("/edit", (req, res) => {
    const todoId = req.body.id;

    const todo = find(req.session.todos, ["id", todoId]);

    req.session.editTask = todo;

    res.send(JSON.stringify(todo));
  })
  .post("/edit/:id", (req, res) => {
    const todoId = req.params.id;

    const todo = find(req.session.todos, ["id", todoId]);

    todo.task = req.body.editTask;

    res.redirect("/");
  });

module.exports = router;
