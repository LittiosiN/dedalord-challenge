import express from 'express'
import {HealthCheck} from '../handlers/HealthCheck'
import authRoute from './auth'
import messagesRoute from './messages'

const router = express.Router()

authRoute(router)
messagesRoute(router)
router.get('/', HealthCheck)

export default router