import createError from 'http-errors'
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import ErrorHandler from './handlers/ErrorHandler'
import httpLogger from './middlewares/HttpLogger'
import router from './routes/index'
import testDB from './testDB'
import socketHandler from './handlers/SocketHandler'

dotenv.config({ path: path.join(__dirname, '../.env') })

const app: express.Application = express()

app.use(cors())
app.use(httpLogger)
app.use(express.json())
app.use(ErrorHandler);

app.use('/', router)

const port = process.env.PORT || '8000'
app.set('port', port)

const server = http.createServer(app)

server.listen(port,  async () => {
  console.info(`Server listening on http://localhost:${port}`)
  socketHandler(server)
  // testDB()
});
