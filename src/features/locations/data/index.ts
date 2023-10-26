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

export const KEY = "location";

export const LocationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  address_1: z
    .string()
    .min(3, "Address 1 must be at least 3 characters long")
    .max(50, "Address 1 must be at most 50 characters long"),
  address_2: z.string(),
  postal_code: z
    .string()
    .length(6, "Postal code must be exactly 6 characters long"),
  country: z.string().length(2, "Country must be exactly 2 characters long"),
});

export type Location = z.infer<typeof LocationSchema> & {
  id: string;
};

/**
 * Data provider hooks
 */

// get full list
type UseGetFullListLocationProps = {
  sort?: SortingState;
  search?: string;
  filter?: string;
};

export const useGetFullListLocation = ({
  sort,
  search,
  filter,
}: UseGetFullListLocationProps) => {
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
      getFullList<Location>({
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
type UseGetPaginatedListLocationProps = {
  page: number;
  perPage: number;
  search?: string;
  sort?: SortingState;
  filter?: string;
};

export const useGetPaginatedListLocation = ({
  page,
  perPage,
  search,
  sort,
  filter,
}: UseGetPaginatedListLocationProps) => {
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
      getPaginatedList<Location>({
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
export const useGetOneLocation = (id: string) => {
  return useQuery({
    queryKey: [KEY, "detail", id],
    queryFn: () => getOne<Location>({ collection: KEY, id }),
    enabled: !!id,
  });
};

// add one record
export const useAddOneLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Location) =>
      addOne<Location>({ collection: KEY, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneLocation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Location) =>
      updateOne<Location>({ collection: KEY, id, newRecord }),
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
export const useDeleteOneLocation = () => {
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
