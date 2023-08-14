import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function pagination(c: number, m: number) {
  const current = c,
    last = m,
    delta = 1,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

/* 
  https://tailwindui.com/components/application-ui/navigation/pagination

  TODO: rows per page
*/

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
const Pagination = ({
  page,
  setPage,
  perPage,
  totalItems,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className={clsx(
            "relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium dark:border-gray-700",
            { "cursor-not-allowed opacity-50": page === 1 },
          )}
        >
          Previous
        </button>
        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          className={clsx(
            "relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium dark:border-gray-700",
            { "cursor-not-allowed opacity-50": page === totalPages },
          )}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing{" "}
            <span className="font-medium">{(page - 1) * perPage + 1}</span> to{" "}
            <span className="font-medium">
              {page * perPage <= totalItems ? page * perPage : totalItems}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              className={clsx(
                "relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 dark:ring-gray-700",
                { "cursor-not-allowed opacity-50": page === 1 },
              )}
              disabled={page === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pagination(page, totalPages).map((i, index) => (
              <button
                key={`pagination-btn-${i}-${index}`}
                onClick={() => typeof i === "number" && setPage(i)}
                aria-current={page === i ? "page" : undefined}
                className={clsx(
                  "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:ring-gray-700",
                  {
                    "focus-visible:outline-focus bg-primary text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2":
                      page === i,
                  },
                )}
              >
                {i}
              </button>
            ))}
            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              className={clsx(
                "relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 dark:ring-gray-700",
                { "cursor-not-allowed opacity-50": page === totalPages },
              )}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
