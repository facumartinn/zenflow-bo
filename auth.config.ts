import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInService } from './src/services/authService'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials, req) {
        const res = await signInService(credentials?.email, credentials?.password)
        const user = await res.data
        console.log(res)

        // Si la autenticación es exitosa, retorna el objeto de usuario
        if (res.status === 200 && user) {
          return user.data
        }

        // Si la autenticación falla, retorna null
        return null
      }
    })
  ],
  callbacks: {
    async session ({ session, token, user }: any) {
      session.accessToken = token.user.token
      session.user = token.user.user
      session.tenant = token.user.user.Tenant
      session.warehouseConfig = token.user.user.Warehouse?.custom_attributes
      return session
    },
    async jwt ({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
}
