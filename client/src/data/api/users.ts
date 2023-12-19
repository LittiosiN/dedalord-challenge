const MESSAGES_URL = `${import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'}/users`

export const getUsers = async (token:string) => {
  const response = await fetch(`${MESSAGES_URL}`,
   {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    method: 'GET', 
  })
  const user = await response.json()
  return user
}