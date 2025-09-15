'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Logo from '@/components/Logo';
import { Github, Instagram, Twitter, MoveRightIcon, LogOut, User, Crown } from 'lucide-react';
import { UserRole } from '@/types/next-auth';

export default function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Crown className='size-4 text-warning' />;
      default:
        return <User className='size-4 text-on-surface-variant' />;
    }
  };


  return (
    <div className='w-full flex items-end justify-between gap-16'>
      <Logo />
      <span className='flex flex-row items-center justify-between gap-4 w-full font-body text-lg'>
        <span>
          <Link href='/about' className='px-4 py-2 text-on-surface hover:underline'>About</Link>
          <Link href='/recipes' className='px-4 py-2 text-on-surface hover:underline'>Recipes</Link>
        </span>
        <span className='flex flex-row items-center justify-end gap-8'>
          <span className='flex flex-row items-center justify-end'>
            <a href='twitter.com' target='_blank' className='p-2 rounded-lg text-on-surface-variant hover:bg-secondary-container/80'>
              <Twitter className='size-[1.25em]' />
            </a>
            <a href='instagram.com' target='_blank' className='p-2 rounded-lg text-on-surface-variant hover:bg-secondary-container/80'>
              <Instagram className='size-[1.25em]' />
            </a>
            <a href='github.com' target='_blank' className='p-2 rounded-lg text-on-surface-variant hover:bg-secondary-container/80'>
              <Github className='size-[1.25em]' />
            </a>
          </span>

          {status === 'loading' ? (
            <div className='px-6 py-2 text-on-surface-variant'>
              Loading...
            </div>
          ) : session ? (
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 px-4 py-2 text-on-surface'>
                {getRoleIcon(session.user.role)}
                <span className='text-sm font-medium'>{session.user?.name || session.user?.email}</span>
              </div>
              <button
                className='flex flex-row items-center justify-center gap-2 px-6 py-2 rounded-lg font-body text-lg bg-error-container text-on-error-container hover:bg-error-container/80 transition-colors'
                onClick={handleSignOut}
              >
                Sign out
                <LogOut className='size-[1.25em]' />
              </button>
            </div>
          ) : (
            <Link href='/auth/signin' className='flex flex-row items-center justify-center gap-2 px-6 py-2 rounded-lg font-body text-lg bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80'>
              Sign in
              <MoveRightIcon className='size-[1.25em]' />
            </Link>
          )}
        </span>
      </span>
    </div>
  );
}
