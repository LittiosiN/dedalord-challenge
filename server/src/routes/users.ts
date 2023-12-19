import express from "express"
import { getUsers } from '../controllers/users.controllers'
import { isAuthenticated } from '../middlewares/Authenticator'

export default (router:express.Router) => {
  router.get('/users',isAuthenticated, getUsers)
}