import createError from 'http-errors'
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import http from 'http'
import ErrorHandler from './handlers/ErrorHandler'
import httpLogger from './middlewares/HttpLogger'
import router from './routes/index'

dotenv.config({ path: path.join(__dirname, '../.env') })

const app: express.Application = express()

app.use(httpLogger)
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.use('/', router)

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404))
});

app.use(ErrorHandler);

const port = process.env.PORT || '8000'
app.set('port', port)

const server = http.createServer(app)

server.listen(port,  async () => {
  console.info(`Server listening on http://localhost:${port}`)
  // initialize "dbs"
});