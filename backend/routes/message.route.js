import express from "express";
import {
  getAllMessages,
  getMessagesByConversationId,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage
} from "../controllers/message.controller.js";

const router = express.Router();

// Routes for message CRUD operations
router.get("/", getAllMessages);                             // GET all messages
router.get("/conversation/:conversationId", getMessagesByConversationId); // GET messages by conversation ID
router.get("/:id", getMessageById);                          // GET a single message by ID
router.post("/", createMessage);                             // POST a new message
router.put("/:id", updateMessage);                           // PUT update a message
router.delete("/:id", deleteMessage);                        // DELETE a message

export default router;
