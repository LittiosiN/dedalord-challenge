import morgan, { StreamOptions } from 'morgan'
import Logger from '../utils/Logger'

const stream: StreamOptions = {
  write: (message) => Logger.info(message),
}

const morganMiddleware = morgan('combined', { stream: stream })

export default morganMiddleware