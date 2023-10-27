import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { SortingState } from "@tanstack/react-table";

import {
  getPaginatedList,
  getOne,
  addOne,
  updateOne,
  deleteOne,
} from "@src/lib/backend";

/**
 * Query keys, schemas and types
 * Structure query keys: https://tkdodo.eu/blog/effective-react-query-keys
 *
 * Endpoint for resource is /location/:location_id/resource
 * Base query key for area is [LOCATION_KEY, last_location, RESOURCE_KEY]
 * Whenever location is switched, invalidate [LOCATION_KEY] will invalidate all
 * queries that depend on location
 *
 * useGetMe to retrieve last_location (:location_id)
 * Set /location/:location_id/area as backend collection string
 */
import { useGetMe } from "@features/me/data";
import { KEY as LOCATION_KEY } from "@features/locations/data";

export const KEY = "resource";

export const ResourceSchema = z.object({
  name: z.string(),
});

export type Resource = z.infer<typeof ResourceSchema> & {
  id: string;
};

/**
 * Data provider hooks
 */

// get paginated list
type UseGetPaginatedListResourceProps = {
  page: number;
  perPage: number;
  search?: string;
  sort?: SortingState;
  filter?: string;
};

export const useGetPaginatedListResource = ({
  page,
  perPage,
  search,
  sort,
  filter,
}: UseGetPaginatedListResourceProps) => {
  const { data: me } = useGetMe();

  return useQuery({
    enabled: !!me,
    queryKey: [
      LOCATION_KEY,
      me?.last_location || 0,
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
      getPaginatedList<Resource>({
        collection: `${LOCATION_KEY}/${me?.last_location}/${KEY}`,
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
export const useGetOneResource = (id: string) => {
  const { data: me } = useGetMe();

  return useQuery({
    enabled: !!me && !!id,
    queryKey: [LOCATION_KEY, me?.last_location, KEY, "detail", id],
    queryFn: () =>
      getOne<Resource>({
        collection: `${LOCATION_KEY}/${me?.last_location}/${KEY}`,
        id,
      }),
  });
};

// add one record
export const useAddOneResource = () => {
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Resource) =>
      addOne<Resource>({
        collection: `${LOCATION_KEY}/${me?.last_location}/${KEY}`,
        newRecord,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LOCATION_KEY, KEY, "list"],
      });
    },
  });
};

// update one record
export const useUpdateOneResource = (id: string) => {
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Resource) =>
      updateOne<Resource>({
        collection: `${LOCATION_KEY}/${me?.last_location}/${KEY}`,
        id,
        newRecord,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LOCATION_KEY, me?.last_location, KEY, "list"],
      });
      queryClient.invalidateQueries({
        queryKey: [LOCATION_KEY, me?.last_location, KEY, "detail", id],
      });
    },
  });
};

// delete one record
export const useDeleteOneResource = () => {
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteOne({
        collection: `${LOCATION_KEY}/${me?.last_location}/${KEY}`,
        id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [LOCATION_KEY, me?.last_location, KEY, "list"],
      });
    },
  });
};
