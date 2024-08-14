import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { route as ChatRouter } from "./routes/chats.route.js";
import cors from "cors";
import nodeCron from "node-cron";
import { deleteOldMessages } from "./cronjob.js";

dotenv.config();

const MONGODB_CONNECTION_STRING = process.env["MONGODB_CONNECTION_STRING"];

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/chats", ChatRouter);

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connectede to database");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);

      nodeCron.schedule("* * * * *", deleteOldMessages);

      console.log(
        "Cron job scheduled to delete messages older than 3 minutes."
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
