import express from 'express'
import {HealthCheck} from '../handlers/HealthCheck'

const router = express.Router()

/* GET home page. */
router.get('/', HealthCheck)

export default router