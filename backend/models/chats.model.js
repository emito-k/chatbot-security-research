import mongoose from "mongoose";

export const ChatSchema = new mongoose.Schema(
  {
    imageUrl: String,
    role: String,
    content: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const ChatModel = mongoose.model("Message", ChatSchema);
