'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  STATUS_OPTIONS,
  useLeadTableFilters,
} from './use-lead-table-filters';
import { UserRoundPlus } from 'lucide-react';
import AddUserModal from '@/components/modals/AddUserModal';
import { Switch } from '@radix-ui/react-switch';
import AssignCampaignModal from '@/components/modals/AssignCampaignModal';

export default function LeadTableAction() {
  const {
    statusFilter,
    setStatusFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    salesforceLeads,
    setSalesforceLeads,
    setPage,
    setSearchQuery
  } = useLeadTableFilters();
  // console.log( "statusFilter", statusFilter )
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='name'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey='status'
        title='Status'
        options={STATUS_OPTIONS}
        setFilterValueAction={setStatusFilter}
        filterValue={statusFilter}
      />
      <div className="flex items-center gap-2">
        <span className="text-sm text-white">Salesforce Only</span>
        <Switch
          checked={!!salesforceLeads}
          onCheckedChange={(checked) => setSalesforceLeads(checked)}
          className={`${
            salesforceLeads ? "bg-indigo-600" : "bg-gray-400"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
        >
          <span className="sr-only">Toggle salesforce filter</span>
          <span
            className={`${
              salesforceLeads ? "translate-x-5" : "translate-x-0"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
          />
        </Switch>
      </div>
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
         <AddUserModal />
         <AssignCampaignModal />
    </div>
  );
}
