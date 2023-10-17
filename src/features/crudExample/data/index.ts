import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { SortingState } from "@tanstack/react-table";
import { sanitizeSqlQuery } from "@src/utils/common";

import {
  getFullList,
  getPaginatedList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
} from "@src/lib/backend";

/* 
  Query keys, schemas and types

	Structure query keys: https://tkdodo.eu/blog/effective-react-query-keys
*/
export const KEY = "examples";

export const ExampleSchema = z.object({
  name: z.string(),
});

export type Example = z.infer<typeof ExampleSchema> & {
  id: string;
};

/* 
  Data provider hooks
*/
// get full list
type UseGetFullListExampleProps = {
  sorting: SortingState;
  filter: string;
};

export const useGetFullListExample = ({
  sorting,
  filter,
}: UseGetFullListExampleProps) => {
  let sortQuery = "-created";

  if (Array.isArray(sorting) && sorting[0]) {
    if (sorting[0].desc) {
      sortQuery = `-${sorting[0].id}`;
    } else {
      sortQuery = sorting[0].id;
    }
  }

  const sanitizedFilter = sanitizeSqlQuery(filter);
  const filterQuery = `(name ~ ${sanitizedFilter})`;

  return useQuery({
    queryKey: [
      KEY,
      "list",
      {
        sort: sortQuery,
        filter: sanitizedFilter,
      },
    ],
    queryFn: () =>
      getFullList<Example>({
        collection: KEY,
        options: {
          sort: sortQuery,
          filter: filterQuery,
        },
      }),
  });
};

// get paginated list
type UseGetPaginatedListExampleProps = {
  page: number;
  perPage: number;
  sorting: SortingState;
  filter: string;
};

export const useGetPaginatedListExample = ({
  page,
  perPage,
  sorting,
  filter,
}: UseGetPaginatedListExampleProps) => {
  let sortQuery = "-created";

  if (Array.isArray(sorting) && sorting[0]) {
    if (sorting[0].desc) {
      sortQuery = `-${sorting[0].id}`;
    } else {
      sortQuery = sorting[0].id;
    }
  }

  const sanitizedFilter = sanitizeSqlQuery(filter);
  const filterQuery = `(name ~ ${sanitizedFilter})`;

  return useQuery({
    queryKey: [
      KEY,
      "list",
      {
        pagination: { page, perPage },
        sort: sortQuery,
        filter: sanitizedFilter,
      },
    ],
    queryFn: () =>
      getPaginatedList<Example>({
        collection: KEY,
        page,
        perPage,
        options: {
          sort: sortQuery,
          filter: filterQuery,
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
