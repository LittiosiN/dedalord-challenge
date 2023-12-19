import { Message } from "../types/Messages"

interface ChatProps {
  messages: Message[]
}

const Chat:React.FC<ChatProps> = ({messages}) => {
  return (
    <ul>
      {
        messages.map((item:Message) => (
          <li key={`chat-entry-${item.timestamp}`}>{item.message}</li>
        ))
      }
    </ul>
  )
}

export default Chat