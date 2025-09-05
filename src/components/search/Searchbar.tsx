'use client';

import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';

interface SearchbarProps {
  placeholder?: string;
}

export default function Searchbar(props: SearchbarProps) {
  const { searchQuery, setSearchQuery, setCurrentPage } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  function clearQuery() {
    setSearchQuery('');
    setCurrentPage(1);
    inputRef?.current?.focus();
  };

  return (
    <label className='flex h-9 w-full cursor-text items-center overflow-hidden rounded-lg bg-surface-container-highest focus-within:ring-0 focus-within:outline focus-within:outline-primary'>
      <span className='p-2'>
        <Search className='size-[1.25em] text-on-surface-variant' />
      </span>
      <input

        ref={inputRef}
        className='size-full truncate ring-0 outline-none placeholder:text-on-surface-variant [&::-webkit-search-cancel-button]:appearance-none'
        name='recipeSearch'
        type='search'
        id='recipeSearch'
        title='Search recipes'
        placeholder={props.placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />
      <button
        className='cursor-pointer p-2 text-on-surface-variant ring-0 outline-none hover:bg-surface-container-high focus:bg-surface-container-high focus:ring disabled:hidden'
        title='Clear search'
        type='button'
        disabled={!searchQuery}
        onClick={clearQuery}
      >
        <X className='size-[1.25em]' />
      </button>
    </label>
  );
}
