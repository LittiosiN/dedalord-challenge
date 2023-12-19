import express from "express"
import Logger from '../utils/Logger'
import { MessageDB, Message } from "../models/Message"
import { createJsonError } from "../handlers/ErrorHandler"
import createJsonSuccess from "../helpers/createJsonSuccess"
import { UsersDB } from "../models/User"

export const getMessages = async (req:express.Request, res:express.Response) => {
  try {
    const {username} = req.params
    const messagesDB = MessageDB.getInstance()
    const messages = messagesDB.getMessages(username)
    res.status(200).json(createJsonSuccess(messages, 'Retrieving messages')).end()
  } catch (error) {
    Logger.log({
      level: 'error',
      message: 'Error retrieving messages'
    });
    return res.status(400).json(createJsonError(400,'Error retrieving messages')).end() 
  }
}

export const sendMessage = async (req:express.Request, res:express.Response) => {
  try {
    const {from, to, message, timestamp} = req.body

    if (!from || !to || !message) {
      Logger.log({
        level: 'error',
        message: 'Message missing Sender or Reciever or message text'
      });
      return res.status(400).json(createJsonError(400, 'Message missing Sender or Reciever or message text')).end()
    }

    const messagesDB = MessageDB.getInstance()
    const usersDB = UsersDB.getInstance()
    const userfrom = usersDB.getUser(from)
    const userto = usersDB.getUser(to)
    console.log("user", userfrom)
    console.log("user to", userto)

    if (!userfrom || !userto) {
      Logger.log({
        level: 'error',
        message: 'no valid users for sending messages'
      });
      return res.status(400).json(createJsonError(400, 'no valid users for sending messages')).end()
    }

    const msg = {
      from,
      to,
      message,
      timestamp: timestamp ? timestamp : Date.now().toLocaleString()
    } as Message
    console.log("inserting", msg)
    const newMessages = messagesDB.addMessage(msg)
    console.log("messages", newMessages)
    return res.status(200).json(createJsonSuccess(newMessages,'Successfully sended msg in')).end()
  } catch (error) {
    Logger.log({
      level: 'error',
      message: error
    });
    return res.status(500).json(createJsonError(500, 'unexpected server error'+ error))
  }
}