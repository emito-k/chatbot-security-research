import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import messageRoutes from "./routes/message.route.js";
import sequelize from "./models/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from 'cors';
import Message from "./models/message.model.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }, // Allow all origins; you can restrict this based on your setup
});

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);

// Keep track of message timers for self-destructing messages
const selfDestructTimers = {};

sequelize.sync({ force: false }).then(async () => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for 'send-message' event
    socket.on("send-message", async (messageData) => {
      try {
        const { message_content, conversation_id_fk, user_id_fk, is_encrypted, encryption_algorithm } = messageData;

        // Create message
        const newMessage = await Message.create({
          message_content, conversation_id_fk, user_id_fk, is_encrypted, encryption_algorithm
        });

        // Fetch the message with user data for broadcasting
        const message = await Message.findOne({
          include: [{ model: User }],
          where: { id: newMessage.dataValues.id }
        });

        // Emit the message to all connected clients in the conversation room
        io.to(`conversation-${conversation_id_fk}`).emit("receive-message", message.toJSON());
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { error: "Failed to send message" });
      }
    });

    // Delete a message
    socket.on("delete-message", async (messageId) => {
      try {
        const deletedMessage = await Message.destroy({ where: { id: messageId } });
        if (deletedMessage) {
          io.emit("message-deleted", { messageId });
        } else {
          socket.emit("error", { error: "Message not found" });
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        socket.emit("error", { error: "Failed to delete message" });
      }
    });

    // Self-destruct messages after a set time
    socket.on("self-destruct-messages", ({ conversation_id, seconds }) => {
      console.log(`Messages in conversation ${conversation_id} will self-destruct in ${seconds} seconds`);

      // Set a timer to delete all messages in the conversation after `seconds`
      selfDestructTimers[conversation_id] = setTimeout(async () => {
        try {
          await Message.destroy({ where: { conversation_id_fk: conversation_id } });

          // Notify users in the conversation room that messages were destroyed
          io.to(`conversation-${conversation_id}`).emit("self-destructed", {
            message: "All messages have been self-destructed",
          });

          // Clean up the timer after execution
          delete selfDestructTimers[conversation_id];
        } catch (error) {
          console.error(`Error auto-deleting messages for conversation ${conversation_id}:`, error);
        }
      }, seconds * 1000);
    });

    // Cancel the self-destruct timer
    socket.on("turn-off-self-destruct-messages", (conversationId) => {
      if (selfDestructTimers[conversationId]) {
        clearTimeout(selfDestructTimers[conversationId]);
        delete selfDestructTimers[conversationId];
        console.log(`Self-destruct for conversation ${conversationId} has been canceled`);
        socket.emit("self-destruct-canceled", {
          message: "Self-destruct for messages has been canceled",
        });
      } else {
        socket.emit("error", { error: "No self-destruct timer found for this conversation" });
      }
    });

    // Join a conversation room
    socket.on("join-conversation", (conversationId) => {
      socket.join(`conversation-${conversationId}`);
      console.log(`User joined conversation room: conversation-${conversationId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}).catch((error) => {
  console.error("Failed to connect to database:", error);
});
