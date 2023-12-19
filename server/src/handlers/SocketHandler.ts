import { Message, MessageDB } from '../models/Message'
import { UsersDB } from '../models/User'
import { Server } from 'socket.io'
import Logger from '../utils/Logger'

function socketHandler(server: any) {
  const io = new Server(server, {
    cors:{
      origin: "http://localhost:5173"
    }
  })
  const messagesDB = MessageDB.getInstance()
  const usersDB = UsersDB.getInstance()

  io.on('connection', (socket) => {
    Logger.info('New client connected')

    socket.on('sendMessage', (messageData: Message) => {
      Logger.info('Message')
      console.log("message", messageData)
      const recipient = usersDB.getUser(messageData.to)
      if (!recipient) {
        // Process and store the message data
        messagesDB.addMessage(messageData)
        // Emit message to relevant recipient via username
        io.emit('newMessage', messageData)
      }

    });

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
}

export default socketHandler