import { AxiosError } from "axios";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

/* 
  To set errors in react-hook-form from server validation errors

	Implemented for goyave

  return true if error.response.data is not empty
  return false if error.response.data is empty
*/
function setServerValidationError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) {
  // check if axios error
  if (error instanceof AxiosError) {
    switch (error.code) {
      case "ERR_BAD_REQUEST": {
        const errors = error.response?.data?.validationError;
        // check if errors is not empty
        if (Object.keys(errors).length > 0) {
          // loop through each field and set error
          Object.keys(errors).forEach((key) => {
            setError(key as Path<T>, {
              message: errors[key as keyof T]?.errors[0] || "Invalid",
            });
          });
          return true;
        }
        return false;
      }
      default:
        return false;
    }
  }

  return false;
}

export default setServerValidationError;
