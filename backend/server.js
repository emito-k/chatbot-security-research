import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { route as ChatRouter } from "./routes/chats.route.js";
import cors from "cors";
import nodeCron from "node-cron";
import { deleteOldMessages } from "./cronjob.js";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const MONGODB_CONNECTION_STRING = process.env["MONGODB_CONNECTION_STRING"];

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/chats", ChatRouter);

app.get("", async (req, res) => res.status(200).json({ message: "Hello" }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: ["*"],
});

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to database");

    io.on("connection", (socket) => {
      console.log(`The user ${socket.id} just joined`);

      socket.on("hello-world", (data) => {
        console.log(data);
      });
    });
    // app.listen(PORT, () => {
    //   console.log(`Server running on http://localhost:${PORT}`);

    //   nodeCron.schedule("* * * * *", deleteOldMessages);

    //   console.log(
    //     "Cron job scheduled to delete messages older than 3 minutes."
    //   );
    // });
    httpServer.listen(PORT);
  })
  .catch((error) => {
    console.error(error);
  });
