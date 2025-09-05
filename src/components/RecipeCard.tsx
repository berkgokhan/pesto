import Image from 'next/image';
import Link from "next/link";

interface RecipeCardProps {
  id: string;
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  tags?: string[];
}

const Tag = ({ tag }: { tag: string; }) => (
  <span className='px-3 py-1 text-sm font-mono outline-1 outline-outline rounded-full'>
    {tag}
  </span>
);

export default function RecipeCard({ id, imageSrc, alt, title, description, tags = [] }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${id}`} className='contents'>
      <div className='w-full flex flex-col items-center justify-start bg-surface-container rounded-lg'>
        <div className='relative min-h-64 w-full'>
          <Image
            fill
            src={imageSrc}
            alt={alt}
            style={{
              objectFit: 'cover'
            }}
            className='rounded-lg'
          />
        </div>
        <div className='flex flex-row flex-wrap items-end place-content-between justify-between gap-4 w-full h-full p-4'>
          <div className='flex flex-col items-start justify-start gap-2'>
            <h3 className='text-xl font-display font-bold text-primary'>{title}</h3>
            <p className='text-md font-body text-on-surface-variant'>{description}</p>
          </div>
          {tags.length > 0 && (
            <div className='flex flex-row flex-wrap-reverse items-center justify-start gap-2'>
              {tags.map((tag, index) => (
                <Tag key={index} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
