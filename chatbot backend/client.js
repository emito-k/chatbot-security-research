import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000");
const my_sender_id = "bot";

socket.on("receive-message", async (data) => {
  console.log('received message...');
  console.log(data);

  if (data.sender_id === my_sender_id) {
    return;
  }

  const bot = await axios
    .post("http://localhost:11434/api/chat", {
      model: "codegemma",
      messages: [...data.previous_chats, data.new_chat],
      stream: false,
    })
    .then((res) => res.data);

    console.log(bot);

  // Send reply
  console.log('sending reply...');
  socket.emit("send-message", {
    sender_id: "bot",
    use_cloud_chats: false,
    encrypted: false,
    previous_chats: [],
    new_chat:{
      role: bot.message.role,
      content: bot.message.content,
      imageUrl:
        "https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif",
    }
  });
});
