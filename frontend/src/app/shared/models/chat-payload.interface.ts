import { ChatMessageInterface } from "./chat-message.interface";

export interface ChatPayloadInterface {
  sender_id: string,
  use_cloud_chats: boolean,
  encrypted: boolean,
  previous_chats: ChatMessageInterface[],
  new_chat: ChatMessageInterface
}
