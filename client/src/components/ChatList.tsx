interface ChatListProps {
  list: string[]
  onSelect: (username:string) => void
  selected: string|null
}

const ChatList:React.FC<ChatListProps> = ({list, onSelect, selected}) => {
  if (!list) {
    return
  }

  return (
    <ul>
      {
        list.map(i => <li key={i} onClick={() => onSelect(i)}>{i}</li>)
      }
    </ul>
  )
}

export default ChatList