import express from 'express'
import {HealthCheck} from '../handlers/HealthCheck'
import authRoute from './auth'

const router = express.Router()

authRoute(router)
router.get('/', HealthCheck)

export default router