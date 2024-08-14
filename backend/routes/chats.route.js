import express from "express";
import { createMessage, getMessages } from "../controller/chats.controller.js";

export const route = express.Router();

route.post("/send", createMessage);
route.get("/", getMessages);
