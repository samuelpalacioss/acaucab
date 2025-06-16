"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Country } from "@/data/countries"

export const columns: ColumnDef<Country>[] = [
  {
    accessorKey: "name",
    header: "Country",
    cell: ({ row }) => {
      const country = row.original
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{country.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
    cell: ({ row }) => {
      return <div className="text-right">{row.original.percentage}%</div>
    },
  },
  {
    accessorKey: "users",
    header: "Users",
    cell: ({ row }) => {
      return <div className="text-right">{row.original.users}</div>
    },
  },
]
