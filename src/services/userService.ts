/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axios from 'axios'

export const signInService = async (username: string | undefined, password: string | undefined) => {
  const response = await axios.post('/auth/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
  if (!response.status) {
    throw new Error('Error al recuperar los datos del usuario')
  }
  return response.data
}
