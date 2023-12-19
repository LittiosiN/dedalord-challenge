import { Message } from "../types/Messages"

interface ChatProps {
  messages: Message[]
  user:string
}

const Chat:React.FC<ChatProps> = ({messages, user}) => {
  return (
    <>
      {messages.map((item:Message, index:number) => (
          <div key={`chat-entry-${index}`} className="flex rounded-md shadow-md my-5 w-fit">
            <div className="bg-gray-500">
              <h3 className="font-bold text-lg px-2">
                {item.from.charAt(0).toLocaleUpperCase()}
              </h3>
            </div>
            <div className="px-2 rounded-md bg-white">
              <span className="text-sm">{item.from}</span>
              <h3 className="font-bold">{item.message}</h3>
              <h4 className="text-xs text-right">{item.timestamp}</h4>
           </div>
          </div>
        ))
      }
    </>
  )
}

export default Chat