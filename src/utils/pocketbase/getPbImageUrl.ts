/* 
	https://pocketbase.io/docs/files-handling

	http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
*/
type Props = {
  /** collection id or name */
  collection: string;
  recordId: string;
  fileName: string;
  thumbFormat?: string;
};

const BASE_URL = import.meta.env.VITE_API_URL;

const getPbImageUrl = ({
  collection,
  recordId,
  fileName,
  thumbFormat,
}: Props) =>
  `${BASE_URL}/api/files/${collection}/${recordId}/${fileName}${
    thumbFormat ? `?thumb=${thumbFormat}` : ""
  }`;

export default getPbImageUrl;
