import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { SortingState } from "@tanstack/react-table";
import { sortingStateToString } from "@src/utils/common";

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

export const KEY = "users";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
});

export type User = z.infer<typeof UserSchema> & {
  id: string;
};

/**
 * Data provider hooks
 */

// get full list
type UseGetFullListUserProps = {
  sort: SortingState;
  filter: string;
};

export const useGetFullListUser = ({
  sort,
  filter,
}: UseGetFullListUserProps) => {
  return useQuery({
    queryKey: [
      KEY,
      "list",
      {
        sort: sortingStateToString(sort),
        filter,
      },
    ],
    queryFn: () =>
      getFullList<User>({
        collection: KEY,
        options: {
          sort: sortingStateToString(sort),
          filter,
        },
      }),
  });
};

// get paginated list
type UseGetPaginatedListUserProps = {
  page: number;
  perPage: number;
  sort: SortingState;
  filter: string;
};

export const useGetPaginatedListUser = ({
  page,
  perPage,
  sort,
  filter,
}: UseGetPaginatedListUserProps) => {
  return useQuery({
    queryKey: [
      KEY,
      "list",
      {
        pagination: { page, perPage },
        sort: sortingStateToString(sort),
        filter,
      },
    ],
    queryFn: () =>
      getPaginatedList<User>({
        collection: KEY,
        page,
        perPage,
        options: {
          sort: sortingStateToString(sort),
          filter,
        },
      }),
  });
};

// get single record
export const useGetOneUser = (id: string) => {
  return useQuery({
    queryKey: [KEY, "detail", id],
    queryFn: () => getOne<User>({ collection: KEY, id }),
    enabled: !!id,
  });
};

// add one record
export const useAddOneUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: User) =>
      addOne<User>({ collection: KEY, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: User) =>
      updateOne<User>({ collection: KEY, id, newRecord }),
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
export const useDeleteOneUser = () => {
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
