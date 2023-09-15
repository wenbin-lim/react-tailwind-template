import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

/* 
	Data provider methods
*/
import {
  getFullList,
  getPaginatedList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
} from "@src/lib/dataProvider";

/* 
	Constants and Types

	Query Keys: https://tkdodo.eu/blog/effective-react-query-keys
*/
const KEY = "vcard";

export const VcardSchema = z.object({
  card_template: z.string(),
		first_name: z.string(),
		last_name: z.string(),
		job_title: z.string(),
		phone: z.string(),
		prettyPhone: z.string(),
		avatar: z.string(),
		description: z.string(),
		email: z.string(),
		fb: z.string(),
		ig: z.string(),
		blogspot: z.string(),
		website: z.string(),
		linkedin: z.string(),
		company: z.string(),
		logo: z.string(),
  name: z.string(),
  title: z.string(),

});

export type Vcard = z.infer<typeof VcardSchema> & {
  id: string;
};

// get full list
export const useGetFullListVcard = () => {
  return useQuery({
    queryKey: [KEY, "list"],
    queryFn: () => getFullList<Vcard>({ collectionName: KEY }),
  });
};

// get paginated list
export const useGetPaginatedListVcard = (page: number, perPage: number) => {
  return useQuery({
    queryKey: [KEY, "list", { pagination: { page, perPage } }],
    queryFn: () =>
      getPaginatedList<Vcard>({ collectionName: KEY, page, perPage }),
  });
};

// get single record
export const useGetOneVcard = ({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [KEY, "detail", id],
    queryFn: () => getOne<Vcard>({ collectionName: KEY, id }),
    enabled,
  });
};

// add one record
export const useAddOneVcard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: Vcard) =>
      addOne<Vcard>({ collectionName: KEY, newData }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneVcard = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: Vcard) =>
      updateOne<Vcard>({ collectionName: KEY, id, newData }),
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
export const useDeleteOneVcard = () => {
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
