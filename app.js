const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");
const { verifyToken } = require("./tokens");
const { authenticateToken } = require("./tokens");
const { router } = require("./authenctication");
const { User } = require("./models");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
io.use((socket, next) => {
  authenticateToken(socket, next);
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("", router);

app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile("../node_modules/socket.io/client-dist/socket.io.js");
});

app.get("/users/", verifyToken, async (req, res) => {
  const users = await User.getAll();
  res.json(users);
});

io.on("connection", async (socket) => {
  const user = await User.getById(socket.userId);
  console.log(user.username, "connected");
  io.emit;
  socket.on("message", (message) => {
    const messageJson = {
      username: user.username,
      message: message,
    };
    io.emit("message", messageJson);
  });
  socket.on("disconnect", () => {
    console.log("Client has disconnected.");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
