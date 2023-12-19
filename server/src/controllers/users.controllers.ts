import express from "express"
import Logger from '../utils/Logger'
import { createJsonError } from "../handlers/ErrorHandler"
import createJsonSuccess from "../helpers/createJsonSuccess"
import { UsersDB } from "../models/User"

export const getUsers = async (req:express.Request, res:express.Response) => {
  try {
    const usersDB = UsersDB.getInstance()
    const users = usersDB.getUsers()
    console.log("getting users", users)
    res.status(200).json(createJsonSuccess(users.map(i => i.username), 'Successfully retrieved users')).end()
  } catch (error) {
    Logger.log({
      level: 'error',
      message: 'Error retrieving users'
    });
    return res.status(400).json(createJsonError(400,'Error retrieving users')).end() 
  }
}
