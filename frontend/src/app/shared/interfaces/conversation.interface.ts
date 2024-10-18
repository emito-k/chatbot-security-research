import { UserInterface } from "../models/user.interface";

export interface ConversationInterface {
  id: string,
  userA: UserInterface,
  userB: UserInterface
}

export interface ConversationDTOInterface {
  user_a_id_fk: string,
  user_b_id_fk: string
}
