'use client';

import { useSearch } from '@/contexts/SearchContext';

export default function PageSizeSelector() {
  const { pageSize, setPageSize, pageSizeOptions, setCurrentPage } = useSearch();

  return (
    <div className='flex items-center gap-2'>
      <label htmlFor='page-size' className='text-sm font-medium text-on-surface-variant'>
        Show:
      </label>
      <select
        value={pageSize}
        className='px-3 py-1 text-sm bg-surface-container rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        name='page-size'
        id='page-size'
        title='Page size'
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        {pageSizeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className='text-sm text-on-surface-variant'>
        per page
      </span>
    </div>
  );
}
