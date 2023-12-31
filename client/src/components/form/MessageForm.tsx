import { useState } from "react"
import Button from "../Button"


interface MessageFormProps {
  handleSubmit: (msg:string) => void
  invalidate: boolean
}

const MessageForm:React.FC<MessageFormProps> = ({handleSubmit, invalidate}) => {
  const [newMsg, setNewMsg] = useState<string>('')
  
  const onSubmit = () => {
    handleSubmit(newMsg)
    setNewMsg('')
  }

  return (
    <div
      className="
        mt-2
        sm:mx-auto
        sm:w-fullseparator
        sm:max-w-md
      "
    >
      <div
        className="
          px-4
          py-4
          sm:rounded-lg
          sm:px-10
          shadow
        "
      >
        <form
          className="flex gap-2 md:gap-4"
        >
          <input
            type="text"
            value={newMsg}
            onChange={(event) => setNewMsg(event.target.value)}
            disabled={invalidate}
            placeholder="type your message..."
            className="rounded-md border-2 outline-none lg:px-3 py-2 lg:w-96"
          ></input>          
          <Button
            type="submit"
            disabled={invalidate}
            onClick={onSubmit}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default MessageForm