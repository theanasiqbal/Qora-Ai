'use client';
import { Lead } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import AssignLeads from './assign-leads';

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'feedId',
    header: 'FEED'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    header: 'Assign to',
    id: 'assign',
    cell: ({row}) => <AssignLeads leadData={row.original}/>
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
