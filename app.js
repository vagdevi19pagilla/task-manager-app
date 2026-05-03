const API = "http://localhost:5000/api";
let token = "";

// REGISTER
async function register() {
  await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  alert("Registered!");
}

// LOGIN
async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  token = data.token;

  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";

  loadTasks();
}

// LOAD TASKS
async function loadTasks() {
  const res = await fetch(`${API}/tasks`, {
    headers: { Authorization: token }
  });

  const tasks = await res.json();
  tasksList.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t.title}
      <button onclick="deleteTask('${t._id}')">❌</button>
    `;
    tasks.appendChild(li);
  });
}

// ADD TASK
async function addTask() {
  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title: taskInput.value })
  });

  loadTasks();
}

// DELETE
async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });

  loadTasks();
}