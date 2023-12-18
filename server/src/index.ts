import createError from 'http-errors'
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import ErrorHandler from './handlers/ErrorHandler'
import httpLogger from './middlewares/HttpLogger'
import router from './routes/index'
import initDB from './initDB'

dotenv.config({ path: path.join(__dirname, '../.env') })

const app: express.Application = express()

app.use(httpLogger)
app.use(cors())
app.use(express.json())
app.use(ErrorHandler);
// app.use(express.urlencoded({ extended: false }))

app.use('/', router)

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404))
});


const port = process.env.PORT || '8000'
app.set('port', port)

const server = http.createServer(app)

server.listen(port,  async () => {
  console.info(`Server listening on http://localhost:${port}`)
  // initialize "dbs"
  // initDB()
});

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on('error', onError);