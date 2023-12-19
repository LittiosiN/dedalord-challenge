const MESSAGES_URL = `${import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'}/messages`

export const getUserMessages = async (username:string, token:string) => {
  const response = await fetch(`${MESSAGES_URL}/${username}`,
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