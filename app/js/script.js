addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    window.location.href = "log-in.html";
  }
});

const token = localStorage.getItem("jwtToken");
const socket = io("ws://localhost:3000", {
  auth: {
    token: token,
  },
});

function sendMessage() {
  let textField = document.getElementById("textField");
  const content = textField.value.trim();
  if (content != "") {
    socket.emit("message", content);
    textField.value = "";
  }
}

socket.on("message", (message) => {
  const messages = document.getElementById("messages");
  const li = document.createElement("li");
  const username = document.createElement("small");
  username.textContent = "@" + message.username;
  li.textContent = message.message;
  messages.appendChild(username);
  messages.appendChild(li);
});
