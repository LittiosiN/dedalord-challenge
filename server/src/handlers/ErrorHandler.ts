import express from 'express'

export const createJsonError = (statusCode: number, message: string) => {
  return {
    status: 'error',
    statusCode,
    message,
    ok: false,
  }
}

export class MyError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}


const handleError = (err: MyError, res: express.Response): void => {
  const { statusCode, message } = err
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ok: false,
  }).end();
}

const ErrorHandler:express.ErrorRequestHandler = (err: MyError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  handleError(err, res)
}

export default ErrorHandler