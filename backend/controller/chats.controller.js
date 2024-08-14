import { ChatModel as Chat } from "../models/chats.model.js";
import axios from "axios";

export async function createMessage(req, res) {
  try {
    const { role, content } = req.body;

    console.log(`r=${role}, c=${content}`);

    await Chat.create({ role, content });

    let chats = (await Chat.find({})) ?? [];

    const bot = await axios
      .post("http://localhost:11434/api/chat", {
        model: "codegemma",
        messages: chats,
        stream: false,
      })
      .then((res) => res.data);

    console.log(bot);
    await Chat.create({ role: bot.message.role, content: bot.message.content });

    chats = (await Chat.find({})) ?? [];

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getMessages(req, res) {
  try {
    const chats = (await Chat.find({})) ?? [];
    res.status(200).json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
}
