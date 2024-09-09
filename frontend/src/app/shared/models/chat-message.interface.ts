export interface ChatMessageInterface {
  imageUrl?: string,
  id?: string,
  content: string,
  created_at: string,
  role: "assistant" | "user" | "system" | "tool"
}
