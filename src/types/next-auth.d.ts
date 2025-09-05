import NextAuth from 'next-auth';

export type UserRole = 'user' | 'admin';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role: UserRole;
		};
	}

	interface User {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		role: UserRole;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		role: UserRole;
	}
}
