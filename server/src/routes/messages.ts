import express from "express"
import { getMessages, sendMessage } from '../controllers/messages.controller'
import { isAuthenticated } from '../middlewares/Authenticator'

export default (router:express.Router) => {
  router.get('/messages/:username',isAuthenticated, getMessages)
  router.post('/messages', isAuthenticated, sendMessage)
}