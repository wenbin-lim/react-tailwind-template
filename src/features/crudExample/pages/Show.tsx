/*
  https://tailwindui.com/components/application-ui/data-display/description-lists
*/
import { useParams, useNavigate } from "react-router-dom";

import { useGetOneExample } from "../data";

import { DetailLoader } from "@src/components/loaders";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch data
  const { data } = useGetOneExample(id || "");

  if (data) {
    return (
      <main className="flex flex-col gap-y-6 py-4 sm:px-6 lg:px-8">
        <header className="px-4 sm:px-0">
          <h3 className="text-lg font-semibold">Detail</h3>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
            More information...
          </p>
        </header>

        {/* details */}
        <dl className="flex-1 divide-y divide-gray-200 border-y border-gray-300 dark:divide-gray-800 dark:border-gray-700">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300 sm:col-span-2 sm:mt-0">
              {data.name || "-"}
            </dd>
          </div>
        </dl>

        <footer className="flex px-4 sm:px-0">
          <button
            className="btn btn-outline ml-auto ring-gray-300 sm:btn-lg dark:ring-gray-700"
            type="button"
            onClick={() => navigate("/crud-example")}
          >
            Back
          </button>
        </footer>
      </main>
    );
  }

  return <DetailLoader />;
};
export default Show;