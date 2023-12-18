export type Message = {
  from: string
  to: string
  message: string
  timestamp?: string
}

export class MessageDB {
  private static instance: MessageDB
  private messages: Map<string, Map<string, Message[]>>

  private constructor() {
    this.messages = new Map<string, Map<string, Message[]>>()
  }

  public static getInstance(): MessageDB {
    if (!MessageDB.instance) {
      MessageDB.instance = new MessageDB()
    }
    return MessageDB.instance
  }

  getMessages (username:string):{username:string, value:Message[]}[] {
    const userMap = this.messages.get(username)
    if (!userMap) {
      return []
    }
    const arr = Array.from(userMap, ([username, value]) => ({username, value}))
    return arr
  }


  addMessage (msg: Message):Message[] | undefined {
    // no messages at all
    if(!this.messages.get(msg.from)) {
      const messagesMapSender = new Map<string,Message[]>()
      const messagesMapReciever = new Map<string,Message[]>()
      const msgArray = [].concat(msg)
      messagesMapSender.set(msg.to,msgArray)
      messagesMapReciever.set(msg.from, msgArray)
      this.messages.set(msg.from, messagesMapSender)
      // now we need to replicate for reciever
      if (!this.messages.get(msg.to)){
        this.messages.set(msg.to, messagesMapReciever)
      } else {
        const auxMap = this.messages.get(msg.to)
        auxMap.set(msg.from, msgArray)
      }
      return this.messages.get(msg.from).get(msg.to)
    }
    const currentMapMsgs = this.messages.get(msg.from)
    if (!currentMapMsgs.get(msg.to)) {
      const msgArr = [].concat(msg)
      currentMapMsgs.set(msg.to, msgArr)
      //destinatary has no messages at all
      if(!this.messages.get(msg.to)){
        const messagesMapReciever = new Map<string,Message[]>()
        messagesMapReciever.set(msg.from, msgArr)
        this.messages.set(msg.to, messagesMapReciever)
      } else {
        const currentMapReciever = this.messages.get(msg.to)
        // destinatary has no messages for sender
        if (!currentMapReciever.get(msg.from)) {
          currentMapReciever.set(msg.from, msgArr)
        } else {
          const currentArrReciever = currentMapReciever.get(msg.from)
          currentMapReciever.set(msg.from, [...currentArrReciever, msg])
        }
      }
      return this.messages.get(msg.from).get(msg.to)
    }
    const arrMsg = currentMapMsgs.get(msg.to)
    const newArr = [...arrMsg, msg]
    currentMapMsgs.set(msg.to, newArr)
    this.messages.get(msg.to).set(msg.from, newArr)
    return this.messages.get(msg.from).get(msg.to)
  }
}