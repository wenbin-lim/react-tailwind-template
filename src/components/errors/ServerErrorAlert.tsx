import { useRouteError } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/20/solid";

const ServerErrorAlert = () => {
  const error = useRouteError();
  console.error("error", JSON.stringify(error, null, 2));

  return (
    <div className="mx-auto flex h-full max-w-md items-start justify-center p-4">
      <div className="rounded-md bg-red-50 p-4 shadow-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Something went wrong
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>Please try again later or contact admin for help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServerErrorAlert;
