import express from "express"
import { getMessages, sendMessage } from '../controllers/messages.controller'

export default (router:express.Router) => {
  router.get('/messages/:username', getMessages)
  router.post('/messages', sendMessage)
}