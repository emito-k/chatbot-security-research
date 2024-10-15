// server.js
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
// import conversationRoutes from "./routes/conversation.route.js";
// import messageRoutes from "./routes/message.route.js";
import sequelize from "./models/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);
// app.use("/conversations", conversationRoutes);
// app.use("/messages", messageRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log(error);
  console.error("Failed to connect to database");
});

