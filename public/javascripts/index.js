const todoInput = document.querySelector("input[name='task']");
const submitBtn = document.querySelector(".submit-btn");
const editInput = document.querySelector("input[name='editTask']");
const doneBtn = document.querySelector(".done-btn");

try {
  editInput.addEventListener("input", ({ target: { value } }) => {
    const normValue = value.trim();

    if (normValue.length >= 3) {
      doneBtn.disabled = false;
    } else {
      doneBtn.disabled = true;
    }
  });
} catch (error) {}

try {
  todoInput.addEventListener("input", ({ target: { value } }) => {
    const normValue = value.trim();

    if (normValue.length >= 3) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  });
} catch (error) {}

const addTodo = function () {
  window.event.preventDefault();

  fetch(`/todo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: todoInput.value,
    }),
  }).then((response) => {
    window.location.pathname = "/";
  });
};

const editTodo = function (id) {
  fetch(`/todo/${id}`, {
    method: "GET",
  }).then((response) => {
    window.location.pathname = "/edit";
  });
};

const updateTodo = function (id) {
  window.event.preventDefault();

  fetch(`/todo/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      editedTask: editInput.value,
    }),
  }).then((response) => {
    window.location.pathname = "/";
  });
};

const deleteTodo = function (id) {
  fetch(`/todo/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: todoInput.value,
    }),
  }).then((response) => {
    window.location.pathname = "/";
  });
};
