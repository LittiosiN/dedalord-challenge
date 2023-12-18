import express from "express"
import Logger from "../utils/Logger"

export const HealthCheck = async (_req: express.Request, res: express.Response) => {
  Logger.info('Server is starting')
  res.status(200).send('Server is working').end()
}