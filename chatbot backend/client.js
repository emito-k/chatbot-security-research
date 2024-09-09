import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000");

socket.emit("hello-world", {
  mito: "hello",
  khoza: "world",
});

socket.on("receive-message", async (messages) => {
  const bot = await axios
    .post("http://localhost:11434/api/chat", {
      model: "codegemma",
      messages: messages,
      stream: false,
    })
    .then((res) => {
      res.data;
    });

  // Send reply
  socket.emit("send-message", {
    role: bot.message.role,
    content: bot.message.content,
    imageUrl:
      "https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif",
  });
});
