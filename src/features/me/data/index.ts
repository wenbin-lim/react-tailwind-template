import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";

import backend, { PaginatedListResult } from "@src/lib/backend";
import { Location } from "@src/features/locations/data";

/**
 * Query keys, schemas and types
 * Structure query keys: https://tkdodo.eu/blog/effective-react-query-keys
 */

export const KEY = "me";

export type DbUser = {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  type: string;
  is_super_admin: boolean;
  last_location: number;
  locations: Location[];
};

/**
 * Data provider hooks
 */
// get me
// returns user profile and list of locations under this profile
export const useGetMe = () => {
  const auth = getAuth();

  return useQuery({
    queryKey: [KEY, "firebaseId", auth.currentUser?.uid],
    queryFn: async () => {
      const meRes = await backend.get<DbUser>("/me");
      const locationRes =
        await backend.get<PaginatedListResult<Location>>("/location");

      const data = {
        ...meRes.data,
        locations: locationRes.data.records,
      };

      return data;
    },
    enabled: !!auth.currentUser?.uid,
  });
};

// switch last_location
export const useSwitchLastLocation = () => {
  const auth = getAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (location_id: number) => {
      const res = await backend.post("/me/switch-location", {
        location_id,
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEY, "firebaseId", auth.currentUser?.uid],
      });
    },
  });
};
