const createJsonSuccess = (data: any, message: string) => {
  return {
    status: 'success',
    statusCode: 200,
    message,
    ok: true,
    data,
  }
}

export default createJsonSuccess