import { useEffect, useState } from "react";
import io from 'socket.io-client'
import ChatList from "../components/ChatList";
import { User } from "../types/Auth";
import { FullMessages, Message } from "../types/Messages";
import { Navigate } from 'react-router-dom' 
import { getUserMessages } from "../data/api/messages";
import { Response } from '../types/Response'
import { toast } from "react-toastify";
import Chat from "../components/Chat";
import MessageForm from "../components/form/MessageForm";

const socket = io(import.meta.env.VITE_SERVER_URL)

interface ChatPageProps {
  user: User | null
}

const ChatPage:React.FC<ChatPageProps> = ({user}) => {
  if (!user) {
    return <Navigate to="/" replace />
  }

  const [currentContact, setCurrentContact] = useState<string|null>(null)
  const [contacts, setContacts] = useState<string[]>([])
  const [messages, setMessages] = useState<Map<string,Message[]>|null>(null)
  const [lastMessageRecieved, setLastMessageRecieved] = useState<Message|null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const currentMessages:Message[]|null = messages?.get(currentContact || '') || []

  const fillChats = (data:FullMessages[]) => {
    const c:string[] = []
    const msgs = new Map<string,Message[]>()
    data.map((item:FullMessages) => {
      c.push(item.username)
      msgs.set(item.username,item.value)
    })
    setContacts(c)
    setMessages(msgs)
  }
  
  useEffect(() => {
    getUserMessages(user.username, user.sessionToken)
    .then((res:Response) => {
      if (!res.ok) {
        console.log("error", res)
        toast.error(res.message,{position: toast.POSITION.TOP_CENTER})
        return
      }
      console.log("obtuve", res?.data)
      return res
      })
      .then(res => fillChats(res?.data))
      .finally(() => setLoading(false))
      
      socket.on('newMessage', (messageData:Message) => {
        setLastMessageRecieved(messageData)
      })
    },[])
    
    useEffect(() => {
      if (lastMessageRecieved) {
        const old = messages?.get(currentContact || '')
        if (old && old.length > 0) {
          if(old[old.length-1].timestamp !== lastMessageRecieved?.timestamp && currentContact) {
            messages?.set(currentContact, [...old, lastMessageRecieved])
            setLastMessageRecieved(null)
          }
        }
      }
    }, [lastMessageRecieved])
    
    const handleSubmit = (msg:string) => {
      console.log("hola soy msg", msg)
      if(!currentContact || !user) {
        return
    }
    const messageData = {
      from: user?.username,
      to: currentContact,
      message: msg,
      timestamp: Date.now().toLocaleString()
    }
    socket.emit('sendMessage', messageData)
  }

  const handleSelectContact = (username:string) => {
    setCurrentContact(username)
  }

  return (
    <>
      <main className="w-screen h-screen h-50 bg-gray-200 flex">
        <aside>
          <nav className="w-52">
            {loading && <>loading...</>}
            {!loading && <ChatList list={contacts} onSelect={handleSelectContact} selected={currentContact}/>}
          </nav>
        </aside>
        <section>
          {loading && <>loading...</>}
          {!loading && (
            <>
              <div className="h-5/6 w-full">
                <Chat messages={currentMessages}/>
              </div>
              <div className="bg-gray-700 h-full">
                <MessageForm loading={loading} handleSubmit={handleSubmit}/>
              </div>
            </>
          )}
        </section>
      </main>

    </>
  )
}

export default ChatPage