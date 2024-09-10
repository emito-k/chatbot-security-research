import { ChatMessageInterface } from "./chat-message.interface";

export interface ChatPayloadInterface {
  use_cloud_chats: boolean,
  encrypted: boolean,
  previous_chats: ChatMessageInterface[],
  new_chat: ChatMessageInterface
}
