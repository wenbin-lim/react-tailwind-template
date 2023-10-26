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

export const KEY = "reservation";

export const ReservationSchema = z.object({
  name: z.string(),
});

export type Reservation = z.infer<typeof ReservationSchema> & {
  id: string;
};

/**
 * Data provider hooks
 */

// get full list
type UseGetFullListReservationProps = {
  sort?: SortingState;
  search?: string;
  filter?: string;
};

export const useGetFullListReservation = ({
  sort,
  search,
  filter,
}: UseGetFullListReservationProps) => {
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
      getFullList<Reservation>({
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
type UseGetPaginatedListReservationProps = {
  page: number;
  perPage: number;
  search?: string;
  sort?: SortingState;
  filter?: string;
};

export const useGetPaginatedListReservation = ({
  page,
  perPage,
  search,
  sort,
  filter,
}: UseGetPaginatedListReservationProps) => {
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
      getPaginatedList<Reservation>({
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
export const useGetOneReservation = (id: string) => {
  return useQuery({
    queryKey: [KEY, "detail", id],
    queryFn: () => getOne<Reservation>({ collection: KEY, id }),
    enabled: !!id,
  });
};

// add one record
export const useAddOneReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Reservation) =>
      addOne<Reservation>({ collection: KEY, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneReservation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Reservation) =>
      updateOne<Reservation>({ collection: KEY, id, newRecord }),
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
export const useDeleteOneReservation = () => {
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
