import clsx from "clsx"
import { Message } from "../types/Messages"
import { formateDate } from "../utils/formater"

interface ChatProps {
  messages: Message[]
  user:string
}

const Chat:React.FC<ChatProps> = ({messages, user}) => {
  return (
    <div className="overflow-scroll h-[80vh] lg:h-[91vh] px-4">
      {messages.map((item:Message, index:number) => (
          <div key={`chat-entry-${index}`} className={clsx(`flex rounded-md shadow-md my-5 w-fit`,user === item.from && 'ml-auto')}>
            <div className="bg-gray-500 justify-center items-center flex rounded-l-md w-10">
              <h3 className="font-bold text-lg px-2">
                {item.from.charAt(0).toLocaleUpperCase()}
              </h3>
            </div>
            <div className="px-2 rounded-md bg-white">
              <span className="text-sm">{item.from}</span>
              <h3 className="font-bold">{item.message}</h3>
              <h4 className="text-xs text-right">{formateDate(item.timestamp)}</h4>
           </div>
          </div>
        ))
      }
    </div>
  )
}

export default Chat