'use client';

import { useSearch } from '@/contexts/SearchContext';

export default function SortSelector() {
  const { sortBy, setSortBy, sortOptions, setCurrentPage } = useSearch();

  return (
    <label className='h-9 flex flex-row items-center justify-start bg-surface-container rounded-lg border border-outline-variant overflow-hidden'>
      <span className='text-on-surface-variant bg-surface-container-highest p-2'>Sort by:</span>
      <select
        value={sortBy}
        className=' text-on-surface-variant p-2 bg-tertiary-container cursor-pointer'
        name='sort'
        id='sort'
        title='Sort by'
        onChange={(e) => {
          setSortBy(e.target.value);
          setCurrentPage(1);
        }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value} className='cursor-pointer text-on-surface-variant'>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
