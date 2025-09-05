import Pagination from '@/components/search/Pagination';
import Searchbar from '@/components/search/Searchbar';
import SortSelector from '@/components/search/SortSelector';
import PageSizeSelector from '@/components/search/PageSizeSelector';
import { SearchProvider } from '@/contexts/SearchContext';
import RecipesGrid from '@/components/search/RecipesGrid';

function Aside() {
  return (
    <aside className='w-full h-full bg-surface-container rounded-lg' />
  );
}

interface SearchParams {
  query: string;
  sort: string;
  page: number;
  pageSize: number;
}

function getSearch(searchParams: Record<string, string | string[] | undefined>): SearchParams {
  return {
    query: searchParams.q as string || '',
    sort: searchParams.s as string || 'featured',
    pageSize: Number(searchParams.m) || 6,
    page: Number(searchParams.page) || 1
  };
}

export default async function RecipesPage(props: PageProps<'/recipes'>) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  console.log('params', params);
  console.log('searchParams', searchParams);

  const search = getSearch(searchParams);
  console.log('search', search);

  return (
    <div className='w-full h-full min-h-screen flex flex-row items-start justify-start gap-8'>
      <SearchProvider
        initialQuery={search.query}
        initialSort={search.sort}
        initialTags={[]}
        initialPageSize={search.pageSize}
        initialPage={search.page}
      >
        {/* <div className='w-1/4 h-full'>
          <Aside />
        </div> */}
        <div className='w-full h-full'>
          <section className='w-full h-full flex flex-col items-start justify-start gap-4'>
            <div className='w-full'>
              <Searchbar placeholder='Search recipes...' />
            </div>
            <div className='w-full'>
              <div className='w-full flex flex-row items-center justify-between gap-4'>
                <div className='w-full flex flex-row items-center justify-start gap-4'>
                  <SortSelector />
                  <PageSizeSelector />
                </div>
                <Pagination />
              </div>
            </div>
            {/* Applied filters */}
            {/* <div className='w-full' /> */}
            {/* Recipes Grid */}
            <div className='w-full'>
              <div className='w-full grid grid-cols-3 max-mobile:grid-cols-1 max-desktop:grid-cols-2 gap-4'>
                <RecipesGrid />
              </div>
            </div>
          </section>
        </div>
      </SearchProvider>
    </div>
  );
}
