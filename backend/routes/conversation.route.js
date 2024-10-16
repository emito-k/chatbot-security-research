// routes/conversation.route.js
import express from "express";
import {
  getAllConversations,
  getConversationById,
  createConversation,
  updateConversation,
  deleteConversation
} from "../controllers/conversation.controller.js";

const router = express.Router();

// Routes for conversation CRUD operations
router.get("/", getAllConversations);          // GET all conversations
router.get("/:id", getConversationById);       // GET conversation by ID
router.post("/", createConversation);          // POST new conversation
router.put("/:id", updateConversation);        // PUT update conversation
router.delete("/:id", deleteConversation);     // DELETE conversation

export default router;
