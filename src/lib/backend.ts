import PocketBase, {
  RecordFullListOptions,
  RecordListOptions,
  RecordOptions,
} from "pocketbase";

const backend = new PocketBase(import.meta.env.VITE_API_URL).autoCancellation(
  false,
);

export default backend;

/* 
	Data providing methods which interfaces with Backend API
	Change the implementation of each methods according to the backend used
*/

// Fetch all records
export type GetFullListProps = {
  collection: string;
  options?: RecordFullListOptions;
};

export async function getFullList<TRecord>({
  collection,
  options,
}: GetFullListProps) {
  const data = await backend
    .collection(collection)
    .getFullList<TRecord>(options);

  return data;
}

// Fetch paginated records
export type GetPaginatedListProps = {
  collection: string;
  page?: number;
  perPage?: number;
  options?: RecordListOptions;
};

export async function getPaginatedList<TRecord>({
  collection,
  page,
  perPage,
  options,
}: GetPaginatedListProps) {
  const data = await backend
    .collection(collection)
    .getList<TRecord>(page, perPage, options);

  return data;
}

// Fetch a single record
export type GetOneProps = {
  collection: string;
  id: string;
  options?: RecordOptions;
};

export async function getOne<TRecord>({
  collection,
  id,
  options,
}: GetOneProps) {
  const data = await backend
    .collection(collection)
    .getOne<TRecord>(id, options);

  return data;
}

// Add a single record
export type AddOneProps = {
  collection: string;
  newRecord: FormData | { [key: string]: any } | undefined;
  options?: RecordOptions;
};

export async function addOne<TRecord>({
  collection,
  newRecord,
  options,
}: AddOneProps) {
  const data = await backend
    .collection(collection)
    .create<TRecord>(newRecord, options);

  return data;
}

// Update a single record
export type UpdateOneProps = {
  collection: string;
  id: string;
  newRecord: FormData | { [key: string]: any } | undefined;
  options?: RecordOptions;
};

export async function updateOne<TRecord>({
  collection,
  id,
  newRecord,
  options,
}: UpdateOneProps): Promise<TRecord> {
  const data = await backend
    .collection(collection)
    .update<TRecord>(id, newRecord, options);

  return data;
}

// Delete a single record
export type DeleteOneProps = {
  collection: string;
  id: string;
  options?: RecordOptions;
};

export async function deleteOne({ collection, id, options }: DeleteOneProps) {
  const data = await backend.collection(collection).delete(id, options);

  return data;
}
