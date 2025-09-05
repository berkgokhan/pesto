import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='text-center'>
        <div className='w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
          <svg className='w-12 h-12 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        </div>
        <h1 className='text-4xl font-bold text-primary mb-4'>Recipe Not Found</h1>
        <p className='text-xl text-on-surface-variant mb-8 max-w-md mx-auto'>
          Sorry, we couldn't find the recipe you're looking for. It might have been moved or deleted.
        </p>
        <div className='space-x-4'>
          <Link
            href='/recipes'
            className='inline-block bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors'
          >
            Browse All Recipes
          </Link>
          <Link
            href='/'
            className='inline-block bg-outline text-on-surface py-3 px-6 rounded-lg font-medium hover:bg-outline/20 transition-colors border border-outline'
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
