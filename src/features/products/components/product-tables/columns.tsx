"use client";
import { Product } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "content",
    header: "CONTENT",
    cell: ({ row }) => (
      <div className="group relative max-w-[300px]">
        <div className="max-h-[3.0em] overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-h-[1000px] group-hover:whitespace-normal group-hover:break-words">
          {row.original.content}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "prompt",
    header: "PROMPT",
  },
  {
    accessorKey: "published",
    header: "PUBLISHED",
  },
  {
    accessorKey: "impressions",
    header: "IMPRESSIONS",
  },
  {
    accessorKey: "platform",
    header: "PLATFORM",
  },
  {
    accessorKey: "leads",
    header: "LEADS",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
