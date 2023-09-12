import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

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
export const useGetFullListExample = () => {
  return useQuery({
    queryKey: [KEY, "list"],
    queryFn: () =>
      getFullList<Example>({
        collection: KEY,
        options: {
          sort: "-created",
        },
      }),
  });
};

// get paginated list
export const useGetPaginatedListExample = (page: number, perPage: number) => {
  return useQuery({
    queryKey: [KEY, "list", { pagination: { page, perPage } }],
    queryFn: () =>
      getPaginatedList<Example>({
        collection: KEY,
        page,
        perPage,
        options: {
          sort: "-created",
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
