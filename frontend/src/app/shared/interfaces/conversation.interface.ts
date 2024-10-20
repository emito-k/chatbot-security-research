import { UserInterface } from "../models/user.interface";

export interface ConversationInterface {
  id: string,
  UserA: UserInterface,
  UserB: UserInterface
}

export interface ConversationDTOInterface {
  user_a_id_fk: string,
  user_b_id_fk: string
}
