import { User } from "../types/Auth";

interface ChatPageProps {
  user: User|null
}

const ChatPage:React.FC<ChatPageProps> = ({user}) => {
  console.log("user", user)

  return (
    <div>
      Bienvenido
      {user?.username}
    </div>
  )
}

export default ChatPage