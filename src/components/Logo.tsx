import Link from 'next/link';
import { Wheat } from 'lucide-react';

export default function Logo() {
  return (
    <Link href='/' className='flex flex-row items-center gap-4 text-5xl font-display font-bold text-primary'>
      <Wheat className='size-[1em]' />
      <h1>Pesto</h1>
    </Link>
  );
}
