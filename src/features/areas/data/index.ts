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
 * One location has many areas
 * Endpoint for area is /location/:location_id/area
 * Base query key for area is [LOCATION_KEY, last_location, AREA_KEY]
 * Whenever location is switched, invalidate [LOCATION_KEY] will invalidate all
 * queries that depend on location
 *
 * useGetMe to retrieve last_location (:location_id)
 * Set /location/:location_id/area as backend collection string
 */
import { useGetMe } from "@features/me/data";
import { KEY as LOCATION_KEY } from "@features/locations/data";

export const KEY = "area";

export const AreaSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type Area = z.infer<typeof AreaSchema> & {
  id: string;
};

/**
 * Data provider hooks
 */

// get paginated list
type UseGetPaginatedListAreaProps = {
  page: number;
  perPage: number;
  search?: string;
  sort?: SortingState;
  filter?: string;
};

export const useGetPaginatedListArea = ({
  page,
  perPage,
  search,
  sort,
  filter,
}: UseGetPaginatedListAreaProps) => {
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
      getPaginatedList<Area>({
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
export const useGetOneArea = (id: string) => {
  const { data: me } = useGetMe();

  return useQuery({
    enabled: !!me && !!id,
    queryKey: [LOCATION_KEY, me?.last_location, KEY, "detail", id],
    queryFn: () =>
      getOne<Area>({
        collection: `${LOCATION_KEY}/${me?.last_location}/${KEY}`,
        id,
      }),
  });
};

// add one record
export const useAddOneArea = () => {
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Area) =>
      addOne<Area>({
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
export const useUpdateOneArea = (id: string) => {
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecord: Area) =>
      updateOne<Area>({
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
export const useDeleteOneArea = () => {
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
