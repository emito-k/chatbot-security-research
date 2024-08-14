export interface ChatMessageInterface {
  imgUrl?: string,
  content: string,
  timestamp: string,
  role: "assistant" | "user" | "system" | "tool"
}
