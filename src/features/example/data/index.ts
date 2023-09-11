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
*/
const EXAMPLE_KEY = "examples";

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
    queryKey: [EXAMPLE_KEY, "list"],
    queryFn: () => getFullList<Example>({ collection: EXAMPLE_KEY }),
  });
};

// get paginated list
export const useGetPaginatedListExample = (page: number, perPage: number) => {
  return useQuery({
    queryKey: [EXAMPLE_KEY, "list", { pagination: { page, perPage } }],
    queryFn: () =>
      getPaginatedList<Example>({ collection: EXAMPLE_KEY, page, perPage }),
  });
};

// get single record
export const useGetOneExample = (id: string) => {
  return useQuery({
    queryKey: [EXAMPLE_KEY, "detail", id],
    queryFn: () => getOne<Example>({ collection: EXAMPLE_KEY, id }),
    enabled: !!id,
  });
};

// add one record
export const useAddOneExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Example) =>
      addOne<Example>({ collection: EXAMPLE_KEY, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXAMPLE_KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneExample = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Example) =>
      updateOne<Example>({ collection: EXAMPLE_KEY, id, newRecord }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXAMPLE_KEY, "list"],
      });
    },
  });
};

// delete one record
export const useDeleteOneExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOne({ collection: EXAMPLE_KEY, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXAMPLE_KEY, "list"],
      });
    },
  });
};
