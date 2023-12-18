import express from "express"
import { random, authentication } from "../utils/authentication"
import Logger from '../utils/Logger'
import { UsersDB } from "../models/User"
import { createJsonError } from "../handlers/ErrorHandler"
import createJsonSuccess from "../helpers/createJsonSuccess"

export const getUsers = async (req:express.Request, res:express.Response) => {
  try {
    const usersDB = UsersDB.getInstance()
    const users = usersDB.getUsers()
    console.log("users", users)
    res.status(200).json(users).end()
  } catch (error) {
    Logger.log({
      level: 'error',
      message: 'Error retrieving users'
    });
    return res.status(400).json(createJsonError(400,'Error retrieving users')).end() 
  }
}

export const login = async (req:express.Request, res:express.Response) => {
  try {
    const {username, password} = req.body

    if (!username || !password) {
      Logger.log({
        level: 'error',
        message: 'No username nor password provided!'
      });
      return res.status(400).json(createJsonError(400, 'No username nor password provided!')).end()
    }

    const usersDB = UsersDB.getInstance()
    const existingUser = usersDB.getUser(username)

    if (!existingUser) {
      Logger.log({
        level: 'error',
        message: 'Invalid User'
      });
      return res.status(400).json(createJsonError(403, 'Wrong credentials')).end()
    }

    const expectedPasswordHash = authentication(existingUser.authentication.salt, password)

    if (expectedPasswordHash !== existingUser.authentication.password) {
      Logger.log({
        level: 'error',
        message: 'Invalid password'
      });
      return res.status(403).json(createJsonError(403, 'Wrong credentials')).end()
    }

    const salt = random()
    const sessionToken = authentication(salt, existingUser.username)
    existingUser.authentication.sessionToken = sessionToken

    const updatedUser = usersDB.updateUser(existingUser)

    return res.status(200).json(createJsonSuccess({username: updatedUser.username, sessionToken: updatedUser.authentication.sessionToken},'Successfully logged in')).end()
  } catch (error) {
    Logger.log({
      level: 'error',
      message: error
    });
    return res.status(500).json(createJsonError(500, 'unexpected server error'+ error))
  }
}

export const register = async (req:express.Request, res:express.Response, next: express.NextFunction) => {
  try {
    const {username, password} = req.body
    
    if (!username || !password) {
      Logger.log({
        level: 'error',
        message: 'No username nor password provided!'
      });
      res.status(400).json(createJsonError(400, 'No username nor password provided!')).end()
    }
    const usersDB = UsersDB.getInstance()

    //see if user exists
    const existingUser = usersDB.getUser(username)
    
    if (existingUser) {
      console.log("user already exists")
      return res.status(400).json(createJsonError(400, "user already exists!")).end()
    }

    const salt = random()
    const encriptedPsw = authentication(salt, password)
    // console.log("password", password, "username", username, "salt", salt, "encriptedPsw", encriptedPsw)
    const newUser = usersDB.addUser({
      username,
      authentication: {
        salt,
        password: encriptedPsw
      }
    })
    console.log("new user", newUser)
    return res.status(200).json(createJsonSuccess(newUser.username, 'User successfull created'))
  } catch (error) {
    Logger.log({
      level: 'error',
      message: error
    });
    return res.sendStatus(500)
  }
}