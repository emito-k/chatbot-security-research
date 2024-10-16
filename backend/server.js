// server.js
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import messageRoutes from "./routes/message.route.js";
import sequelize from "./models/index.js";
dotenv.config();
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: ["*"],
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log(error);
  console.error("Failed to connect to database");
});

