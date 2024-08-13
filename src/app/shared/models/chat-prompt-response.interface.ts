export interface ChatPromptResponseInterface {
  context: number[],
  created_at: string,
  done: boolean,
  done_reason: string,
  eval_count: number,
  eval_duration: number,
  load_duration: number,
  model: string,
  prompt_eval_count: number,
  prompt_eval_duration: number,
  response: string,
  total_duration: string
}

// context: Array(61) [ 968, 2997, 235298, … ]
// created_at: "2024-08-13T19:34:32.6919543Z"
// done: true
// done_reason: "stop"
// eval_count: 37
// eval_duration: 31590902000
// load_duration: 20618232200
// model: "codegemma"
// prompt_eval_count: 32
// prompt_eval_duration: 16918320000
// response: "I am doing well, thank you. I am ready to assist you with any questions or tasks you may have. How can I help you today?"
// total_duration: 69162033100
