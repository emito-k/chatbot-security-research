import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [
        { model: Conversation },
        { model: User }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages by conversation ID
export const getMessagesByConversationId = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.findAll({
      where: { conversation_id_fk: conversationId },
      include: [
        { model: User }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single message by ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id, {
      include: [
        { model: Conversation },
        { model: User }
      ]
    });
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { message_content, conversation_id_fk, user_id_fk, is_encrypted, encryption_algorithm } = req.body;
    const newMessage = await Message.create({
      message_content,
      conversation_id_fk,
      user_id_fk,
      is_encrypted,
      encryption_algorithm
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing message
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message_content, is_encrypted, encryption_algorithm } = req.body;

    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.message_content = message_content;
    message.is_encrypted = is_encrypted;
    message.encryption_algorithm = encryption_algorithm;

    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    await message.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
