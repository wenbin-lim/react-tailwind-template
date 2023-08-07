/* 
	Consolidated methods which interface with Backend API
	Change the implementation of each methods according to the backend used
*/
import pb from "@src/lib/pocketbase";
import {
  RecordFullListQueryParams,
  RecordListQueryParams,
  ListResult,
  RecordQueryParams,
} from "pocketbase";

// Fetch all records
export async function getFullList<TRecord>({
  collectionName,
  queryParams,
}: {
  collectionName: string;
  queryParams?: RecordFullListQueryParams;
}): Promise<TRecord[]> {
  const data: TRecord[] = await pb
    .collection(collectionName)
    .getFullList(queryParams);

  return data;
}

// Fetch paginated records
export async function getPaginatedList<TRecord>({
  collectionName,
  page,
  perPage,
  queryParams,
}: {
  collectionName: string;
  page: number;
  perPage: number;
  queryParams?: RecordListQueryParams;
}): Promise<ListResult<TRecord>> {
  const data: ListResult<TRecord> = await pb
    .collection(collectionName)
    .getList(page, perPage, queryParams);

  return data;
}

// Fetch a single record
export async function getOne<TRecord>({
  collectionName,
  id,
  queryParams,
}: {
  collectionName: string;
  id: string;
  queryParams?: RecordQueryParams;
}): Promise<TRecord[]> {
  const data: TRecord[] = await pb
    .collection(collectionName)
    .getOne(id, queryParams);

  return data;
}
