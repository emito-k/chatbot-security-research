import { UserInterface } from "./user.interface"

export interface ConversationMessageInterface {
  id: string,
  message_content: string,
  conversation_id_fk: string,
  // user_id_fk: string,
  User: UserInterface,
  is_encrypted: boolean,
  encryption_algorithm: string,
  timestamp: string
}


export interface ConversationMessageDTO {
  message_content: string,
  conversation_id_fk: string,
  user_id_fk: string,
  is_encrypted: boolean,
  encryption_algorithm: string
}
