import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { User, useGetPaginatedListUser, useDeleteOneUser } from "../data";

import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  DataTable,
  DataTableActions,
  DataTableColumnHeader,
  DataTablePagination,
} from "@src/components/ui/data-table";

import { Button } from "@src/components/ui/button";
import Search from "@src/components/ui/search";
import { ListLoader } from "@src/components/loaders";

import { useToast } from "@src/components/toast/use-toast";
import { warn } from "@src/lib/swal";

const List = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sort, setSort] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");

  // fetch data list
  const { data } = useGetPaginatedListUser({
    page: pageIndex + 1,
    perPage: pageSize,
    sort,
    filter,
  });

  // function to delete on record
  const deleteFn = useDeleteOneUser();
  const onDelete = useCallback(
    async (id: string) => {
      const result = await warn.fire();

      if (result.isConfirmed) {
        deleteFn.mutate(id, {
          onSuccess: () =>
            toast({
              description: "Deleted successfully",
            }),
        });
      }
    },
    [deleteFn, toast],
  );

  // set up table
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
      },
      {
        accessorKey: "username",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Username" />
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="name" />
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DataTableActions
            actions={[
              {
                label: "View",
                callback: () => navigate(`${row.original.id}`),
              },
              {
                label: "Edit",
                callback: () => navigate(`${row.original.id}/edit`),
              },
              {
                label: "Delete",
                callback: () => onDelete(row.original.id),
              },
            ]}
          />
        ),
      },
    ],
    [navigate, onDelete],
  );

  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.totalPages ?? -1,
    onPaginationChange: setPagination,
    onSortingChange: setSort,
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination: { pageIndex, pageSize },
      sorting: sort,
    },
  });

  return (
    <article className="p-container flex h-full flex-col gap-y-6">
      <header className="flex items-center justify-between">
        <Search
          value={filter}
          onChange={setFilter}
          placeholder="Search..."
          className="w-full sm:max-w-xs"
        />

        <Button onClick={() => navigate("new")}>New</Button>
      </header>

      {data ? (
        <>
          <section className="flex-1">
            <DataTable table={table} />
          </section>

          <footer>
            <DataTablePagination table={table} />
          </footer>
        </>
      ) : (
        <ListLoader />
      )}
    </article>
  );
};
export default List;