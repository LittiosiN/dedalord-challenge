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
import { getUsers } from "../data/api/users";

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
    const msgs = new Map<string,Message[]>()
    data.map((item:FullMessages) => {
      msgs.set(item.username,item.value)
    })
    setMessages(msgs)
  }
  
  useEffect(() => {
    getUsers(user.sessionToken)
      .then((res:Response) => setContacts(res.data.filter((i:string) => i !== user.username)))
    getUserMessages(user.username, user.sessionToken)
    .then((res:Response) => {
      if (!res.ok) {
        console.log("error", res)
        toast.error(res.message,{position: toast.POSITION.TOP_CENTER})
        return
      }
      return res
      })
      .then(res => fillChats(res?.data))
      .finally(() => setLoading(false))
      
      socket.on('newMessage', (messageData:Message) => {
        setLastMessageRecieved(messageData)
      })
    },[])
    
    useEffect(() => {
      if (lastMessageRecieved && currentContact) {
        const old = messages?.get(currentContact)
        if (old && old.length > 0) {
          if(old[old.length-1].timestamp !== lastMessageRecieved?.timestamp) {
            messages?.set(currentContact, [...old, lastMessageRecieved])
            setLastMessageRecieved(null)
          }
        } else {
          messages?.set(currentContact, [lastMessageRecieved])
          setLastMessageRecieved(null)
        }
      }
    }, [lastMessageRecieved])
    
    const handleSubmit = (msg:string) => {
      if(!currentContact || !user) {
        return
      }
      const messageData = {
        from: user?.username,
        to: currentContact,
        message: msg,
        timestamp: new Date().getTime()
      }
      socket.emit('sendMessage', messageData)
  }

  const handleSelectContact = (username:string) => {
    setCurrentContact(username)
  }

  return (
    <>
      <main className="w-screen h-screen bg-gray-200 lg:px-32">
        <div className="flex">
          <aside className="bg-gray-400">
            <nav className="w-24 p-2 lg:w-52">
              {loading && <>loading...</>}
              {!loading && <ChatList list={contacts} onSelect={handleSelectContact} selected={currentContact}/>}
            </nav>
          </aside>
          <section className="flex flex-col lg:w-3/4">
            {loading && <>loading...</>}
            {!loading && currentContact &&(
              <>
                <Chat messages={currentMessages} user={user.username}/>
                <div className="bg-gray-300">
                  <MessageForm loading={loading} handleSubmit={handleSubmit}/>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  )
}

export default ChatPage