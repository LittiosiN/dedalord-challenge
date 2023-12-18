import { iRegisterInputs, iLoginInputs } from "../../types/Auth"

const AUTH_URL = `${import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'}/auth`

export const registerUser = async (data:iRegisterInputs) => {
  const response = await fetch(`${AUTH_URL}/register`,
   {
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    method: 'POST', 
    body: JSON.stringify(data)
  })
  const user = await response.json()
  return user
}

export const loginUser = async (data:iLoginInputs) => {
  const response = await fetch(`${AUTH_URL}/login`,
   {
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    method: 'POST', 
    body: JSON.stringify(data)
  })
  const user = await response.json()
  return user
}

