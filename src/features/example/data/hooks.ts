import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Data provider methods
import {
  getFullList,
  getPaginatedList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
} from "@src/lib/dataProvider";

// Constants and Types
const KEY = "examples";

type Example = {
  id: string;
  name: string;
  title: string;
  description: string;
};

// get full list
export const useGetFullListExample = () => {
  return useQuery({
    queryKey: [KEY, "list"],
    queryFn: () => getFullList<Example>({ collectionName: KEY }),
  });
};

// get paginated list
export const useGetPaginatedListExample = (page: number, perPage: number) => {
  return useQuery({
    queryKey: [KEY, "list", { pagination: { page, perPage } }],
    queryFn: () =>
      getPaginatedList<Example>({ collectionName: KEY, page, perPage }),
  });
};

// get single record
export const useGetOneExample = (id: string) => {
  return useQuery({
    queryKey: [KEY, "detail", id],
    queryFn: () => getOne<Example>({ collectionName: KEY, id }),
  });
};

// create one record
export const useAddOneExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: Example) =>
      addOne<Example>({ collectionName: KEY, newData }),
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
    mutationFn: (newData: Example) =>
      updateOne<Example>({ collectionName: KEY, id, newData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};

// delete one record
export const useDeleteOneExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOne({ collectionName: KEY, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};
