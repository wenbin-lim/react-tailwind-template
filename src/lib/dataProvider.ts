/* 
	Data providing methods which interfaces with Backend API
	Change the implementation of each methods according to the backend used

  Current backend used: Pocketbase
*/
import pb from "@src/lib/pocketbase";
import {
  RecordFullListQueryParams,
  RecordListQueryParams,
  ListResult,
  RecordQueryParams,
  BaseQueryParams,
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

// Add a single record
export async function addOne<TRecord extends {}>({
  collectionName,
  newData,
  queryParams,
}: {
  collectionName: string;
  newData: TRecord;
  queryParams?: RecordQueryParams;
}): Promise<TRecord> {
  const data: TRecord = await pb
    .collection(collectionName)
    .create(newData, queryParams);

  return data;
}

// Update a single record
export async function updateOne<TRecord extends {}>({
  collectionName,
  id,
  newData,
  queryParams,
}: {
  collectionName: string;
  id: string;
  newData: TRecord;
  queryParams?: RecordQueryParams;
}): Promise<TRecord> {
  const data: TRecord = await pb
    .collection(collectionName)
    .update(id, newData, queryParams);

  return data;
}

// Delete a single record
export async function deleteOne({
  collectionName,
  id,
  queryParams,
}: {
  collectionName: string;
  id: string;
  queryParams?: BaseQueryParams;
}): Promise<boolean> {
  return await pb.collection(collectionName).delete(id, queryParams);
}
