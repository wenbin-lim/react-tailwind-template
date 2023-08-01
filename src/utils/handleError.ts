import { ClientResponseError } from "pocketbase";
import toast from "react-hot-toast";

export type ErrorType = {
  type: "error";
  status: number;
  message: string;
};

/* 
	Util function to handle errors
	@param error: unknown
	@return error: ErrorType
*/
const mapStatusToMessage = (status: number) => {
  switch (status) {
    case 400:
      return "Bad Request";
    case 401:
    case 403:
      return "Unauthorized";
    case 404:
      return "Not Found";
    case 500:
    default:
      return "Something went wrong, please try again later.";
  }
};

type HandleErrorProps = {
  error: unknown;
  showToast?: boolean;
  messageOverride?: string;
};

const handleError = ({
  error,
  showToast = false,
  messageOverride = undefined,
}: HandleErrorProps): ErrorType => {
  // console.log("error", JSON.stringify(error, null, 2));

  let status = 500;
  let message = mapStatusToMessage(500);

  // check error type
  if (error instanceof ClientResponseError) {
    status = error.status;
    message = error.response.message || mapStatusToMessage(error.status);
  }

  if (showToast) {
    toast.error(messageOverride || message);
  }

  return {
    type: "error",
    status,
    message: messageOverride || message,
  };
};

export default handleError;
