/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axiosInstance from '../utils/axiosInstance'

export const signInService = async (userEmail: string | undefined, password: string | undefined) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      userEmail,
      password
    })
    console.log(response.data.data, 'asdkmaskdmaskdsa')
    if (response.status !== 200) {
      throw new Error('Error al recuperar los datos del usuario')
    }

    return response.data
  } catch (error) {
    console.error('SignInService Error:', error)
    throw new Error('Error al iniciar sesión')
  }
}
