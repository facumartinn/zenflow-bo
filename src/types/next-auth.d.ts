/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      // {"data":{"user":{"id":1,"role_id":1,"user_email":"facumartinn@gmail.com","barcode":123456,"password":"$2a$12$fy14dnYDCnDpZGMwCQPoXu/nsmifYEcmQ2nYjpzYUw/RXp1Qycr6q","tenant_id":1,"warehouse_id":1,"createdAt":"2024-02-02T20:47:57.000Z","updatedAt":"2024-02-02T20:47:57.000Z"},"expires":"2024-04-19T00:45:05.368Z","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMDg2MTgzOSwiZXhwIjoxNzEwOTQ4MjM5fQ.gMv3uYb20mONsnrJRa3GAj0DU5hke0gMs4b7YZ2BVYM"},"status":"authenticated"}
      id: number
      role_id: number
      user_email: string
      barcode: number
      password: string
      tenant_id: number
      warehouse_id: number
      createdAt: string
      updatedAt: string
    }
    accessToken: string
    /** The user's postal address. */
  }
}
