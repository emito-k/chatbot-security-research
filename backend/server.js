// server.js
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import messageRoutes from "./routes/message.route.js";
import sequelize from "./models/index.js";
import { createMessage } from "./controllers/message.controller.js";
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

sequelize.sync({ force: false }).then(async () => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for 'send-message' event
    socket.on("send-message", async (messageData) => {
      try {
        // Destructure message data
        const { message_content, conversation_id_fk, user_id_fk, is_encrypted, encryption_algorithm } = messageData;

        // Create message using the existing controller function
        const newMessage = await Message.create(
          { message_content, conversation_id_fk, user_id_fk, is_encrypted, encryption_algorithm }
        )

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

    // Join a room for the conversation
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
