import { ClientResponseError } from "pocketbase";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

/* 
	For pocketbase errors only
  To set errors in react-hook-form

  return true if error.response.data is not empty
  return false if error.response.data is empty
*/
function setPbServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) {
  // check if pocketbase error
  if (error instanceof ClientResponseError) {
    // check if error.response.data is not empty
    if (Object.keys(error.response.data).length > 0) {
      // loop through each field and set error
      Object.keys(error.response.data).forEach((key) => {
        setError(key as Path<T>, {
          message: error.response.data[key as keyof T]?.message || "Invalid",
        });
      });
      return true;
    }
  }

  return false;
}

export default setPbServerErrors;
