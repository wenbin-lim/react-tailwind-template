/* 
	https://pocketbase.io/docs/files-handling
*/
import pocketbase, { FileOptions } from "pocketbase";
import backend from "@src/lib/backend";

type Props = {
  record: {
    [key: string]: any;
  };
  fileName: string;
  options?: FileOptions | undefined;
};

const getPbFileUrl = ({ record, fileName, options }: Props) => {
  if (backend instanceof pocketbase) {
    return backend.files.getUrl(record, fileName, options);
  }

  return "";
};

export default getPbFileUrl;
