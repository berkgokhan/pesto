import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRole } from '@/types/next-auth';

// Demo users with different roles
const demoUsers = [
  {
    id: '1',
    email: 'demo@pesto.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'user' as UserRole,
    image: null,
  },
  {
    id: '2',
    email: 'admin@pesto.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    image: null,
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email and password
        const user = demoUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
