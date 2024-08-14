export interface ChatMessageInterface {
  imageUrl?: string,
  content: string,
  created_at: string,
  role: "assistant" | "user" | "system" | "tool"
}
