'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo, useState } from 'react';

export const CATEGORY_OPTIONS = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Toys', label: 'Toys' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Books', label: 'Books' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Beauty Products', label: 'Beauty Products' }
];
export function useProductTableFilters() {

  const [scheduledFilter, setScheduledFilter] = useQueryState(
  'scheduled',
  searchParams.scheduledFilter.withOptions({ shallow: false }).withDefault(false)
);

  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    'categories',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
  setSearchQuery(null);
  setCategoriesFilter(null);
  setScheduledFilter(null);
  setPage(1);
}, [setSearchQuery, setCategoriesFilter, setScheduledFilter, setPage]);


  const isAnyFilterActive = useMemo(() => {
  return !!searchQuery || !!categoriesFilter || scheduledFilter;
}, [searchQuery, categoriesFilter, scheduledFilter]);


  return {
    searchQuery,
    setSearchQuery,
    scheduledFilter,
    setScheduledFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter
  };
}
