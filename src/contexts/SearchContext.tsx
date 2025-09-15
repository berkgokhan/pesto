'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Recipe } from '@/types/recipe';
import { useSearchParams } from 'next/navigation';
import { getRecipesWithFilters } from '@/lib/api';

interface SearchState {
  searchQuery: string;
  sortBy: string;
  sortOptions: Array<{ value: string, label: string; }>;
  selectedTags: string[];
  recipes: Recipe[];
  loading: boolean;
  pageSize: number;
  pageSizeOptions: number[];
  currentPage: number;
  totalPages: number;
}

interface SearchContextType extends SearchState {
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  setSortOptions: (options: Array<{ value: string, label: string; }>) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  setRecipes: (recipes: Recipe[]) => void;
  setLoading: (loading: boolean) => void;
  setPageSize: (size: number) => void;
  setPageSizeOptions: (options: number[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
  initialQuery?: string;
  initialSort?: string;
  initialTags?: string[];
  initialPageSize?: number;
  initialPage?: number;
}

export function SearchProvider({
  children,
  initialQuery = '',
  initialSort = 'Featured',
  initialTags = [],
  initialPageSize = 6,
  initialPage = 1,
}: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState(initialSort);
  const [sortOptions, setSortOptions] = useState([
    { value: 'featured', label: 'Featured' },
    { value: 'date', label: 'Date' },
    { value: 'name', label: 'Name' }
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pageSizeOptions, setPageSizeOptions] = useState([6, 12, 24, 48]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(300);

  const searchParams = useSearchParams();

  // Initialize state from URL params on mount
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlSort = searchParams.get('s') || 'featured';
    const urlTags = searchParams.get('t')?.split(',').filter(Boolean) || [];
    const urlPageSize = parseInt(searchParams.get('m') || '6');
    const urlPage = parseInt(searchParams.get('page') || '1');

    // Only update if different from current state
    if (urlQuery !== searchQuery) setSearchQuery(urlQuery);
    if (urlSort !== sortBy) setSortBy(urlSort);
    if (JSON.stringify(urlTags) !== JSON.stringify(selectedTags)) setSelectedTags(urlTags);
    if (urlPageSize !== pageSize) setPageSize(urlPageSize);
    if (urlPage !== currentPage) setCurrentPage(urlPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update URL and fetch data when search parameters change
  useEffect(() => {
    const update = async () => {
      const params = new URLSearchParams();

      // Update search query
      if (searchQuery) {
        params.set('q', searchQuery);
      }

      // Update sort
      if (sortBy !== 'featured') {
        params.set('s', sortBy);
      }

      // Update tags
      if (selectedTags.length > 0) {
        params.set('t', selectedTags.join(','));
      }

      // Update page size
      if (pageSize !== 6) {
        params.set('m', pageSize.toString());
      }

      // Update current page
      if (currentPage !== 1) {
        params.set('page', currentPage.toString());
      }

      // fetch and update recipes value
      const recipes = await getRecipesWithFilters({
        query: searchQuery,
        sort: sortBy,
        tags: selectedTags,
        pageSize,
        page: currentPage
      });

      setRecipes(recipes.recipes);
      setTotalPages(recipes.totalPages);
      setCurrentPage(recipes.currentPage);

      // Update URL without causing a page reload
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
      window.history.replaceState({}, '', newUrl);
    };
    update();
  }, [searchQuery, sortBy, selectedTags, pageSize, currentPage]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSortBy('featured');
    setPageSize(12);
    setCurrentPage(1);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      sortBy,
      sortOptions,
      selectedTags,
      recipes,
      loading,
      pageSize,
      pageSizeOptions,
      currentPage,
      totalPages,
      setSearchQuery,
      setSortBy,
      setSortOptions,
      setSelectedTags,
      toggleTag,
      clearFilters,
      setRecipes,
      setLoading,
      setPageSize,
      setPageSizeOptions,
      setCurrentPage,
      setTotalPages
    }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
