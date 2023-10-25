import axios from "axios";
import { getAuth } from "firebase/auth";
import { SortingState } from "@tanstack/react-table";

import { sortingStateToString } from "@src/utils/common";

/**
 * Backend - Goyave
 * Data providing methods which interfaces with Backend API
 * Implemented using Axios
 */

// setting axios
const API_URL = import.meta.env.VITE_API_URL;
const backend = axios.create({
  baseURL: API_URL,
});

backend.interceptors.request.use(async (config) => {
  const auth = getAuth();
  await auth.authStateReady();

  const token = await auth.currentUser?.getIdToken();

  // add token to request headers before every request
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default backend;

/**
 * Types
 */

type GetListOptions = {
  filter?: string;
  search?: string;
  sort?: SortingState;
};

type PaginatedListResult<TRecord> = {
  currentPage: number;
  maxPage: number;
  pageSize: number;
  total: number;
  records: TRecord[];
};

// Fetch all records
export type GetFullListProps = {
  collection: string;
  options?: GetListOptions;
};

export async function getFullList<TRecord>({
  collection,
  options,
}: GetFullListProps) {
  let url = `${collection}`;

  const sort = options?.sort;
  if (sort && Array.isArray(sort) && sort[0]) {
    url += `&${sortingStateToString(sort)}`;
  }

  const search = options?.search;
  if (search) {
    url += `&search=${search}`;
  }

  const filter = options?.filter;
  if (filter) {
    url += `&${filter}`;
  }

  const res = await backend.get<TRecord[]>(url);

  return res.data;
}

// Fetch paginated records
export type GetPaginatedListProps = {
  collection: string;
  page: number;
  perPage: number;
  options?: GetListOptions;
};

export async function getPaginatedList<TRecord>({
  collection,
  page,
  perPage,
  options,
}: GetPaginatedListProps) {
  let url = `${collection}?page=${page}&per_page=${perPage}`;

  const sort = options?.sort;
  if (sort && Array.isArray(sort) && sort[0]) {
    url += `&${sortingStateToString(sort)}`;
  }

  const search = options?.search;
  if (search) {
    url += `&search=${search}`;
  }

  const filter = options?.filter;
  if (filter) {
    url += `&${filter}`;
  }

  const res = await backend.get<PaginatedListResult<TRecord>>(url);

  return res.data;
}

// Fetch a single record
export type GetOneProps = {
  collection: string;
  id: string;
};

export async function getOne<TRecord>({ collection, id }: GetOneProps) {
  let url = `${collection}/${id}`;

  const res = await backend.get<TRecord>(url);

  return res.data;
}

// Add a single record
export type AddOneProps = {
  collection: string;
  newRecord: FormData | { [key: string]: any } | undefined;
};

export async function addOne<TRecord>({ collection, newRecord }: AddOneProps) {
  let url = `${collection}`;

  const res = await backend.post<TRecord>(url, newRecord);

  return res.data;
}

// Update a single record
export type UpdateOneProps = {
  collection: string;
  id: string;
  newRecord: FormData | { [key: string]: any } | undefined;
};

export async function updateOne<TRecord>({
  collection,
  id,
  newRecord,
}: UpdateOneProps): Promise<TRecord> {
  let url = `${collection}/${id}`;

  const res = await backend.put<TRecord>(url, newRecord);

  return res.data;
}

// Delete a single record
export type DeleteOneProps = {
  collection: string;
  id: string;
};

export async function deleteOne({ collection, id }: DeleteOneProps) {
  let url = `${collection}/${id}`;

  const res = await backend.delete<boolean>(url);

  return res.data;
}
