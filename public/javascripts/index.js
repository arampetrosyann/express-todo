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

const deleteItem = function (id) {
  fetch(`/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
    }),
  }).then((response) => {
    window.location.reload(true);
  });
};

const editItem = function (id) {
  fetch("/edit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
    }),
  }).then((response) => {
    window.location.pathname = "/edit";
  });
};

const updateItem = function (id) {
  fetch("/edit/id", {
    method: "PUT",
  }).then((response) => {
    window.location.pathname = "/";
  });
};
