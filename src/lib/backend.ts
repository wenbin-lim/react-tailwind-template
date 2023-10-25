/**
 * Firebase auth
 */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MESUREMENTID,
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

/**
 * Backend - Goyave
 * Data providing methods which interfaces with Backend API
 * Implemented using Axios
 */

// setting axios
import axios from "axios";

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
import { SortingState } from "@tanstack/react-table";

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

/**
 * Utils import
 */
import { sortingStateToString } from "@src/utils/common";

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
