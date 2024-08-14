import { ChatModel } from "./models/chats.model.js";

// Function to delete messages older than 3 minutes
export const deleteOldMessages = async () => {
  const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000); // 3 minutes ago

  try {
    const result = await ChatModel.deleteMany({
      created_at: { $lt: threeMinutesAgo },
    });
    console.log(
      `Deleted ${result.deletedCount} messages older than 3 minutes.`
    );
  } catch (error) {
    console.error("Error deleting old messages:", error);
  }
};
