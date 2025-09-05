'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';
import { AlertCircle, ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function SignInPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	useEffect(() => {
		const checkSession = async () => {
			const session = await getSession();
			if (session) {
				router.push('/');
				router.refresh();
			}
		};
		checkSession();
	}, [router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError('Invalid email or password');
			}
			else {
				// Check if we have a session
				const session = await getSession();
				if (session) {
					router.push('/');
					router.refresh();
				}
			}
		}
		catch (error) {
			setError('An error occurred. Please try again.');
		}
		finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full flex flex-col items-center justify-center bg-surface px-4'>
			<div className='w-full max-w-[24rem]'>

				{/* Sign in form */}
				<div className='w-full flex flex-col items-start justify-start gap-8 bg-surface-container p-8 rounded-2xl shadow-lg border border-outline/20'>
					<div className='w-full flex flex-col items-start justify-start gap-4'>
						<Link
							href='/'
							className='flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors'
						>
							<ArrowLeft className='size-4' />
							Back to home
						</Link>
						<div>
							<h1 className='text-3xl font-bold text-on-surface'>Welcome back</h1>
							<p className='text-on-surface-variant'>Sign in to your account to continue</p>
						</div>
					</div>

					<form onSubmit={handleSubmit} className='w-full flex flex-col items-start justify-start gap-4'>
						{/* Email field */}
						<div className='w-full'>
							<label htmlFor='email' className='w-full block text-sm font-medium text-on-surface mb-2'>
								Email address
							</label>
							<div className='relative w-full'>
								<Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-on-surface-variant' />
								<input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full pl-10 pr-4 py-3 border border-outline rounded-lg bg-surface-container-highest text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									placeholder='Enter your email'
									required
								/>
							</div>
						</div>

						{/* Password field */}
						<div className='w-full'>
							<label htmlFor='password' className='w-full block text-sm font-medium text-on-surface mb-2'>
								Password
							</label>
							<div className='relative w-full'>
								<Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-on-surface-variant' />
								<input
									id='password'
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='w-full pl-10 pr-12 py-3 border border-outline rounded-lg bg-surface-container-highest text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									placeholder='Enter your password'
									required
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant hover:text-on-surface'
								>
									{showPassword ? <EyeOff className='size-5' /> : <Eye className='size-5' />}
								</button>
							</div>
						</div>

						{/* Sign in button */}
						<button
							type='submit'
							disabled={isLoading}
							className='w-full bg-primary text-on-primary py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							{isLoading ? 'Signing in...' : 'Sign in'}
						</button>

						{error && (
							<div className='w-full p-2 py-2 flex flex-row items-center justify-start gap-2 bg-error-container text-on-error-container rounded-lg border border-error/20'>
								<AlertCircle className='size-[1.25em]' />
								{error}
							</div>
						)}
					</form>

					{/* Demo credentials */}
					<div className='w-full p-4 py-2 bg-secondary-container/20 rounded-lg border border-secondary/20'>
						<p className='text-sm text-on-surface-variant mb-3 font-medium'>Demo credentials:</p>
						<div className='space-y-2'>
							<div className='p-2 bg-surface-container rounded-lg'>
								<p className='text-xs text-on-surface-variant mb-1'>Regular User</p>
								<p className='text-sm text-on-surface'>Email: demo@pesto.com</p>
								<p className='text-sm text-on-surface'>Password: demo123</p>
							</div>
							<div className='p-2 bg-surface-container rounded-lg'>
								<p className='text-xs text-on-surface-variant mb-1'>Admin User</p>
								<p className='text-sm text-on-surface'>Email: admin@pesto.com</p>
								<p className='text-sm text-on-surface'>Password: admin123</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
