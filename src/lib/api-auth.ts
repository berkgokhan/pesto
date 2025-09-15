import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from '@/types/next-auth';

export interface AuthenticatedUser {
	id: string;
	email: string;
	name?: string | null;
	role: UserRole;
}

/**
 * Get the authenticated user from the request
 */
export async function getAuthenticatedUser(request: NextRequest): Promise<AuthenticatedUser | null> {
	try {
		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET
		});

		if (!token || !token.email) {
			return null;
		}

		return {
			id: token.id as string,
			email: token.email,
			name: token.name as string | null,
			role: token.role as UserRole
		};
	}
	catch (error) {
		console.error('Error getting authenticated user:', error);
		return null;
	}
}

/**
 * Check if user is authenticated
 */
export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
	const user = await getAuthenticatedUser(request);

	if (!user) {
		throw new Error('Authentication required');
	}

	return user;
}

/**
 * Check if user has admin role
 */
export async function requireAdmin(request: NextRequest): Promise<AuthenticatedUser> {
	const user = await requireAuth(request);

	if (user.role !== 'admin') {
		throw new Error('Admin access required');
	}

	return user;
}

/**
 * Check if user has specific role or higher
 */
export async function requireRole(request: NextRequest, requiredRole: UserRole): Promise<AuthenticatedUser> {
	const user = await requireAuth(request);

	const roleHierarchy: Record<UserRole, number> = {
		user: 1,
		admin: 2,
	};

	if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
		throw new Error(`${requiredRole} access required`);
	}

	return user;
}

/**
 * Create an unauthorized response
 */
export function createUnauthorizedResponse(message: string = 'Unauthorized') {
	return NextResponse.json(
		{ success: false, error: message },
		{ status: 401 }
	);
}

/**
 * Create a forbidden response
 */
export function createForbiddenResponse(message: string = 'Forbidden') {
	return NextResponse.json(
		{ success: false, error: message },
		{ status: 403 }
	);
}

/**
 * Wrapper for API routes that require authentication
 */
export function withAuth(handler: (request: NextRequest, user: AuthenticatedUser, ...args: unknown[]) => Promise<NextResponse>) {
	return async (request: NextRequest, ...args: unknown[]): Promise<NextResponse> => {
		try {
			const user = await requireAuth(request);
			return await handler(request, user, ...args);
		}
		catch (error) {
			return createUnauthorizedResponse(error instanceof Error ? error.message : 'Authentication required');
		}
	};
}

/**
 * Wrapper for API routes that require admin access
 */
export function withAdminAuth(handler: (request: NextRequest, user: AuthenticatedUser, ...args: unknown[]) => Promise<NextResponse>) {
	return async (request: NextRequest, ...args: unknown[]): Promise<NextResponse> => {
		try {
			const user = await requireAdmin(request);
			return await handler(request, user, ...args);
		} catch (error) {
			if (error instanceof Error && error.message.includes('Admin')) {
				return createForbiddenResponse(error.message);
			}
			return createUnauthorizedResponse(error instanceof Error ? error.message : 'Authentication required');
		}
	};
}
