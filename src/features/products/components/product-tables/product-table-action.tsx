'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  CATEGORY_OPTIONS,
  useProductTableFilters
} from './use-product-table-filters';
import { Switch } from '@radix-ui/react-switch';

export default function ProductTableAction() {
  const {
    categoriesFilter,
    setCategoriesFilter,
    scheduledFilter,
    setScheduledFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useProductTableFilters();
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='name'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey='categories'
        title='Categories'
        options={CATEGORY_OPTIONS}
        setFilterValueAction={setCategoriesFilter}
        filterValue={categoriesFilter}
      />
      {/* Scheduled Filter Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Scheduled Only</span>
        <Switch
          checked={scheduledFilter}
          onChange={setScheduledFilter}
          className={`${
            scheduledFilter ? 'bg-indigo-600' : 'bg-gray-400'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
        >
          <span className="sr-only">Toggle scheduled filter</span>
          <span
            className={`${
              scheduledFilter ? 'translate-x-5' : 'translate-x-0'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
          />
        </Switch>
      </div>
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
