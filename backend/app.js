// server.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://real-time-polling-system-hjk8.vercel.app'], // Update this with your Vercel app URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://real-time-polling-system-hjk8.vercel.app'], // Update this with your Vercel app URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    transports: ['websocket', 'polling'],
  },
});

// Generate random hexadecimal color code
const generateRandomColor = () => {
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return color;
};

//generate universal Unique identifier id
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Data structures to store poll options and chat messages
let pollOptions = {
  id: "",
  question: "which one is best programmmng language? ",
  options: [
    { option: "Python", votes: 0, color: generateRandomColor() },
    { option: "Javascript", votes: 0, color: generateRandomColor() },
    { option: "Node.js", votes: 0, color: generateRandomColor() },
    { option: "C++", votes: 0, color: generateRandomColor() },
  ],
};

let chatMessages = [];

let signup = [];

// WebSocket connection handler
io.on("connection", async(socket) => {
  console.log(`New client connected ${socket.id}`);

  // Send initial data to the client
  socket.emit("initialData", { pollOptions, chatMessages });

  // Handle voting
  await socket.on("vote", (optionIndex) => {
    console.log(optionIndex);
    if (pollOptions.options[optionIndex]) {
      pollOptions.options[optionIndex].votes++;
      io.emit("updatePoll", pollOptions);
    }
  });

  //generate the new poll
 await socket.on("GeneratedPoll", (data) => {
    console.log(data);
    pollOptions.id = data.id;
    pollOptions.question = data.question;
    pollOptions.options[0].option = data.option1;
    pollOptions.options[1].option = data.option2;
    pollOptions.options[2].option = data.option3;
    pollOptions.options[3].option = data.option4;
    pollOptions.options[0].votes = 0;
    pollOptions.options[1].votes = 0;
    pollOptions.options[2].votes = 0;
    pollOptions.options[3].votes = 0;
    console.log(pollOptions)
    io.emit("Polling", pollOptions);
  });

  // Handle new chat message
 await socket.on("chatMessage", (message) => {
  console.log(message)
    chatMessages.push(message);
    io.emit("newChatMessage", message);
  });

  //handle signup the user
  // socket.on("signup", (userData) => {
  //   userData.uuid = generateUUID();
  //   signup.push(userData);
  // });

  //handle login the user
  // socket.on("login", (userData) => {
  //   if (userData) {
  //     const data = signup.find(
  //       (user) =>
  //         user.email === userData.email && user.password === userData.password
  //     );
  //     if (data) {
  //       io.to(userData.id).emit("getLoginResponse", {
  //         success: true,
  //         message: "login successful",
  //         data: [data],
  //       });
  //     } else {
  //       io.to(userData.id).emit("getLoginResponse", {
  //         success: false,
  //         message: "wrong combination of username and password",
  //         data: [],
  //       });
  //     }
  //   }
    // signup.push(userData);
  // });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Express routes
app.get("/", (req, res) => {
  res.status(200).send("hello world").end();
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
