/* eslint-disable @typescript-eslint/explicit-function-return-type */
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'your-secret-key'

export const verifyAuth = async (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid token')
  }
}
