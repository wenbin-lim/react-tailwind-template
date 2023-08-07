import { useQuery } from "@tanstack/react-query";

// Data provider methods
import { getFullList, getPaginatedList, getOne } from "@src/lib/dataProvider";

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
    queryKey: [KEY],
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
