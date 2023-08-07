/* 
	Consolidated methods which interface with Backend API
	Change the implementation of each methods according to the backend used
*/
import pb from "@src/lib/pocketbase";
import { RecordFullListQueryParams, RecordQueryParams } from "pocketbase";

// Fetch all records
export async function getFullList<TRecord>({
  collectionName,
  queryParams,
}: {
  collectionName: string;
  queryParams?: RecordFullListQueryParams;
}): Promise<TRecord[]> {
  try {
    const data: TRecord[] = await pb
      .collection(collectionName)
      .getFullList(queryParams);

    return data;
  } catch (error) {
    // throw handleError({ error });
    throw error;
  }
}

// Fetch paginated records

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
  try {
    const data: TRecord[] = await pb
      .collection(collectionName)
      .getOne(id, queryParams);

    return data;
  } catch (error) {
    // throw handleError({ error });
    throw error;
  }
}
