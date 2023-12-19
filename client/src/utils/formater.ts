export const formateDate = (timestamp:string) => {
  const date = new Date(timestamp)
  return `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
}