import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className='mx-auto max-w-tablet flex flex-row items-center justify-between gap-16'>
      <div className='flex-2'>
        <Image src='/hero.png' alt='Hero' width={500} height={500} />
      </div>
      <div className='flex-1 flex flex-col items-start justify-start gap-6'>
        <h1 className='text-4xl font-display font-bold text-primary whitespace-pre-wrap'>FIND THE PERFECT APPETIZER</h1>
        <p className='text-lg font-body text-on-surface-variant'>Pesto is a platform for finding the perfect appetizers.</p>
        <Link
          href='/recipes'
          className='flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl hover:bg-primary/80 transition-colors font-medium'
        >
          Browse Recipes
          <ChevronRight className='size-[1.25em] text-on-primary hover:text-on-primary/80 transition-colors' />
        </Link>
      </div>
    </div>
  );
}
