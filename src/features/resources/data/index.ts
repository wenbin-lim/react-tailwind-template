import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { SortingState } from "@tanstack/react-table";

import {
  getFullList,
  getPaginatedList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
} from "@src/lib/backend";

/**
 * Query keys, schemas and types
 * Structure query keys: https://tkdodo.eu/blog/effective-react-query-keys
 */

export const KEY = "resource";

export const ResourceSchema = z.object({
  name: z.string(),
});

export type Resource = z.infer<typeof ResourceSchema> & {
  id: string;
};

/**
 * Data provider hooks
 */

// get full list
type UseGetFullListResourceProps = {
  sort?: SortingState;
  search?: string;
  filter?: string;
};

export const useGetFullListResource = ({
  sort,
  search,
  filter,
}: UseGetFullListResourceProps) => {
  return useQuery({
    queryKey: [
      KEY,
      "list",
      {
        search: search || "",
        sort,
        filter,
      },
    ],
    queryFn: () =>
      getFullList<Resource>({
        collection: KEY,
        options: {
          search: search || "",
          sort,
          filter,
        },
      }),
  });
};

// get paginated list
type UseGetPaginatedListResourceProps = {
  page: number;
  perPage: number;
  search?: string;
  sort?: SortingState;
  filter?: string;
};

export const useGetPaginatedListResource = ({
  page,
  perPage,
  search,
  sort,
  filter,
}: UseGetPaginatedListResourceProps) => {
  return useQuery({
    queryKey: [
      KEY,
      "list",
      {
        search: search || "",
        pagination: { page, perPage },
        sort,
        filter,
      },
    ],
    queryFn: () =>
      getPaginatedList<Resource>({
        collection: KEY,
        page,
        perPage,
        options: {
          search: search || "",
          sort,
          filter,
        },
      }),
  });
};

// get single record
export const useGetOneResource = (id: string) => {
  return useQuery({
    queryKey: [KEY, "detail", id],
    queryFn: () => getOne<Resource>({ collection: KEY, id }),
    enabled: !!id,
  });
};

// add one record
export const useAddOneResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Resource) =>
      addOne<Resource>({ collection: KEY, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneResource = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Resource) =>
      updateOne<Resource>({ collection: KEY, id, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
      queryClient.invalidateQueries({
        queryKey: [KEY, "detail", id],
      });
    },
  });
};

// delete one record
export const useDeleteOneResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOne({ collection: KEY, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};
