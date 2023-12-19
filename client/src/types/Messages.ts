export type Message = {
  from: string
  to: string
  message: string
  timestamp: string
}

export type FullMessages = {
  username: string
  value: Message[]
}