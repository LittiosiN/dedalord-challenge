import express from "express"
import Logger from '../utils/Logger'
import { MessageDB, Message } from "../models/Message"
import { createJsonError } from "../handlers/ErrorHandler"
import createJsonSuccess from "../helpers/createJsonSuccess"

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