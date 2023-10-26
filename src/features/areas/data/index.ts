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

export const KEY = "area";

export const AreaSchema = z.object({
  name: z.string(),
});

export type Area = z.infer<typeof AreaSchema> & {
  id: string;
};

/**
 * Data provider hooks
 */

// get full list
type UseGetFullListAreaProps = {
  sort?: SortingState;
  search?: string;
  filter?: string;
};

export const useGetFullListArea = ({
  sort,
  search,
  filter,
}: UseGetFullListAreaProps) => {
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
      getFullList<Area>({
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
type UseGetPaginatedListAreaProps = {
  page: number;
  perPage: number;
  search?: string;
  sort?: SortingState;
  filter?: string;
};

export const useGetPaginatedListArea = ({
  page,
  perPage,
  search,
  sort,
  filter,
}: UseGetPaginatedListAreaProps) => {
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
      getPaginatedList<Area>({
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
export const useGetOneArea = (id: string) => {
  return useQuery({
    queryKey: [KEY, "detail", id],
    queryFn: () => getOne<Area>({ collection: KEY, id }),
    enabled: !!id,
  });
};

// add one record
export const useAddOneArea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Area) =>
      addOne<Area>({ collection: KEY, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneArea = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Area) =>
      updateOne<Area>({ collection: KEY, id, newRecord }),
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
export const useDeleteOneArea = () => {
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
