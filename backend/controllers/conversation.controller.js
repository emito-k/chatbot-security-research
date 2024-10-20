import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

// Get all conversations
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.findAll({
      include: [
        { model: User, as: "UserA" },
        { model: User, as: "UserB" }
      ]
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a conversation by ID
export const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findByPk(id, {
      include: [
        { model: User, as: "UserA" },
        { model: User, as: "UserB" }
      ]
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new conversation
export const createConversation = async (req, res) => {
  try {
    const { user_a_id_fk, user_b_id_fk } = req.body;
    const newConversation = await Conversation.create({ user_a_id_fk, user_b_id_fk });
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing conversation
export const updateConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_a_id_fk, user_b_id_fk } = req.body;

    const conversation = await Conversation.findByPk(id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    conversation.user_a_id_fk = user_a_id_fk;
    conversation.user_b_id_fk = user_b_id_fk;

    await conversation.save();
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a conversation
export const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.findByPk(id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    await conversation.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
