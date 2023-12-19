import clsx from "clsx"

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
    <ul className="mt-5 uppercase text-base 
    font-roboto font-semibold text-black cursor-pointer">
      {
        list.map(i => 
          <li
            className={clsx("font-bold hover:bg-gray-600",selected === i && 'bg-gray-500')}
            key={"navchat-"+i}
            onClick={() => onSelect(i)}
          >{i}
          </li>
        )
      }
    </ul>
  )
}

export default ChatList