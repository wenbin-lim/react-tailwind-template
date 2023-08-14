/*
  https://tailwindui.com/components/application-ui/data-display/description-lists
*/
import { useParams, useNavigate } from "react-router-dom";
import { useGetOneExample } from "../data/hooks";

import { DetailLoader } from "@src/components/loaders";
import { Button } from "@src/components/buttons";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch data
  const { data } = useGetOneExample({
    id: id || "",
    enabled: !!id,
  });

  if (data) {
    return (
      <main className="grid grid-rows-[auto_1fr_auto] px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7">
            Example Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-700 dark:text-gray-400">
            Details about the example
          </p>
        </div>

        {/* Body */}
        <div className="mt-6 border-t border-gray-300 dark:border-gray-700">
          <dl className="divide-y divide-gray-200 dark:divide-gray-800">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {data.name || "-"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Title</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {data.title || "-"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Description</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {data.description || "-"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-x-6 pt-6">
          <Button
            shadow={false}
            type="button"
            onClick={() => navigate("/examples")}
          >
            Back
          </Button>
        </div>
      </main>
    );
  }

  return <DetailLoader />;
};
export default Show;
