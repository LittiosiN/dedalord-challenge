import express from 'express'
import {HealthCheck} from '../handlers/HealthCheck'
import authRoute from './auth'
import messagesRoute from './messages'
import usersRoute from './users'

const router = express.Router()

authRoute(router)
messagesRoute(router)
usersRoute(router)
router.get('/', HealthCheck)

export default router