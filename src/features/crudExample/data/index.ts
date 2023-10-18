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

export const KEY = "examples";

export const ExampleSchema = z.object({
  name: z.string(),
});

export type Example = z.infer<typeof ExampleSchema> & {
  id: string;
};

/**
 * Data provider hooks
 */

// get full list
type UseGetFullListExampleProps = {
  sort: SortingState;
  filter: string;
};

export const useGetFullListExample = ({
  sort,
  filter,
}: UseGetFullListExampleProps) => {
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
      getFullList<Example>({
        collection: KEY,
        options: {
          sort: sortingStateToString(sort),
          filter,
        },
      }),
  });
};

// get paginated list
type UseGetPaginatedListExampleProps = {
  page: number;
  perPage: number;
  sort: SortingState;
  filter: string;
};

export const useGetPaginatedListExample = ({
  page,
  perPage,
  sort,
  filter,
}: UseGetPaginatedListExampleProps) => {
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
      getPaginatedList<Example>({
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
export const useGetOneExample = (id: string) => {
  return useQuery({
    queryKey: [KEY, "detail", id],
    queryFn: () => getOne<Example>({ collection: KEY, id }),
    enabled: !!id,
  });
};

// add one record
export const useAddOneExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Example) =>
      addOne<Example>({ collection: KEY, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneExample = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Example) =>
      updateOne<Example>({ collection: KEY, id, newRecord }),
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
export const useDeleteOneExample = () => {
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
