const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://192.168.15.12:5173"], // Replace with your client's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let connectedUsers = 0;

// Event handler for incoming messages
io.on("connection", (socket) => {
  io.emit("connectedUsers", connectedUsers);

  // Handle client messages
  socket.on("message", (data) => {
    console.log("Received message:", data);
  });
  console.log("A client has connected");
  connectedUsers += 1;
  console.log("connectedUsers", connectedUsers);

  socket.on("message", (message) => {
    console.log("Received message:", message);
    // You can perform any additional processing or logging here

    // Broadcasting the message to all connected clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A client has disconnected");
    connectedUsers--;
    console.log("connectedUsers", connectedUsers);
    io.emit("connectedUsers", connectedUsers);
  });
});

httpServer.listen(8080, () => {
  console.log("Socket.io server is running on port 8080");
});
