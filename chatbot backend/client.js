import { io } from "socket.io-client";
import axios from "axios";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

// Environment Variables
const API_URL = process.env.API_URL;
const BOT_USERNAME = process.env.BOT_USERNAME;
const BOT_PASSWORD = process.env.BOT_PASSWORD;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io(API_URL);
let botUser = undefined;
let currentConversation = undefined;

// Function to create a new account
const createAccount = async () => {
  try {
    const user = await axios.post(`${API_URL}/users`, {
      username: BOT_USERNAME,
      password: BOT_PASSWORD,
      public_key: PUBLIC_KEY,
      is_bot: true,
    });
    return user.data;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

// Function to log in an existing account
const loginAccount = async () => {
  try {
    const user = await axios.post(`${API_URL}/users/login`, {
      username: BOT_USERNAME,
      password: BOT_PASSWORD,
    });
    return user.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// Function to fetch all conversations
const getConversations = async () => {
  try {
    const conversations = await axios.get(`${API_URL}/conversations`);
    return conversations.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
  }
};

// Function to choose a conversation from a list
const chooseConversation = async () => {
  const conversations = await getConversations();
  console.log("Available Conversations:");
  conversations.forEach((conversation, index) => {
    console.log(`${index}. ${conversation.UserA.username} & ${conversation.UserB.username} (${conversation.id})`);
  });

  reader.question("Select a conversation by number: ", async (value) => {
    const index = Number(value);
    if (!isNaN(index) && index >= 0 && index < conversations.length) {
      currentConversation = conversations[index];
      console.log("Joined conversation:", currentConversation.id);
      listenToMessages();
    } else {
      console.log("Invalid selection.");
      chooseConversation();
    }
  });
};

// Function to listen to messages and reply as the bot
const listenToMessages = () => {
  if (!currentConversation) {
    console.error("No conversation selected.");
    return;
  }

  socket.emit("join-conversation", currentConversation.id);

  // Handle incoming messages
  socket.on("receive-message", async (message) => {
    console.log("------------------------------------------------------");
    console.log("Message received:", message);

    if (message.user_id_fk !== botUser.id) {
      // Bot logic to respond to the message
      const botResponse = await getBotResponse(message);
      console.log(botResponse);
      sendMessage(botResponse);
    }
  });
};

// Function to send a message
const sendMessage = (message) => {
  if (!currentConversation || !botUser) {
    console.error("You must be logged in and in a conversation to send messages.");
    return;
  }

  // { message_content, conversation_id_fk, user_id_fk, is_encrypted, encryption_algorithm }


  socket.emit("send-message", {
    user_id_fk: botUser.id,
    conversation_id_fk: currentConversation.id,
    is_encrypted: false,
    encryption_algorithm: "",
    message_content: message
  });

  console.log("Message sent:", message);
};

// Function to get bot response from a chatbot API
const getBotResponse = async (message) => {
  try {
    const response = await axios.post("http://localhost:11434/api/chat", {
      model: "codegemma", // Example model
      messages: [{
        role: "user",
        conent: message.message_content
      }],
      stream: false,
    });
    return response.data.message.content;
  } catch (error) {
    console.error("Error fetching bot response:", error);
  }
};

// Main menu to navigate bot actions
const menu = () => {
  console.log("\n--- Chatbot Menu ---");
  console.log("1. Create Account");
  console.log("2. Log In");
  if (botUser) {
    console.log("3. Choose Conversation (Listen and Reply)");
    console.log("4. Exit");
  } else {
    console.log("3. Exit");
  }

  reader.question("> ", async (choice) => {
    switch (choice) {
      case "1":
        botUser = await createAccount();
        break;
      case "2":
        botUser = await loginAccount();
        break;
      case "3":
        if (botUser) {
          await chooseConversation();
        } else {
          console.log("Exiting...");
          reader.close();
          return;
        }
        break;
      case "4":
        console.log("Exiting...");
        reader.close();
        return;
      default:
        console.log("Invalid choice. Please select again.");
    }
    menu();
  });
};

// Start the chatbot
menu();
