import express from 'express'
import { createJsonError } from '../handlers/ErrorHandler'
import { UsersDB } from '../models/User'
import Logger from '../utils/Logger'

export const isAuthenticated = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  try {
    console.log("authorization", req.get('authorization')?.split(' ')[1])
    if (!req.headers.authorization) {
      Logger.error("No credentials")
      return res.status(403).json(createJsonError(403,'No credentials sent!')).end()
    }
    const usersDB = UsersDB.getInstance()
    // const sessionToken = req.cookies['JOAKO-NEWS-BACKEND-TEST-AUTH']
    const sessionToken = req.get('authorization').split(' ')[1]
    
    if (!sessionToken) {
      return res.status(403).json(createJsonError(403,'No credentials sent!')).end()
    }

    const user = await usersDB.getUserBySessionToken(sessionToken)

    if (!user) {
      return res.status(403).json(createJsonError(403,'invalid credentials!')).end()
    }
    
    return next()
  } catch (error) {
    Logger.error(error)
    return res.status(500).json(createJsonError(500,'Unexpected server error')).end()
  }
}