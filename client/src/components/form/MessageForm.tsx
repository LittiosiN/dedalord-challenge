import { useState } from "react"
import Button from "../Button"


interface MessageFormProps {
  handleSubmit: (msg:string) => void
  loading: boolean
}

const MessageForm:React.FC<MessageFormProps> = ({handleSubmit, loading}) => {
  const [newMsg, setNewMsg] = useState<string>('')
  
  const onSubmit = () => {
    console.log("submitting", newMsg)
    handleSubmit(newMsg)
    setNewMsg('')
  }

  return (
    <div
      className="
        mt-8
        sm:mx-auto
        sm:w-fullseparator
        sm:max-w-md
      "
    >
      <div
        className="
          bg-white
          px-4
          py-8
          sm:rounded-lg
          sm:px-10
          shadow
        "
      >
        <form
          className="space-y-6 flex flex-col"
        >
          <input
            type="text"
            value={newMsg}
            onChange={(event) => setNewMsg(event.target.value)}
            placeholder="type your message..."
            className="rounded-md border-2 outline-none px-3 py-2 w-4/5"
          ></input>          
          <Button
            type="submit"
            disabled={loading}
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