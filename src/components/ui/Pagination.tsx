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
    <div className="flex">
      {/* mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="btn btn-outline ring-gray-300 dark:ring-gray-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="btn btn-outline ring-gray-300 dark:ring-gray-700"
        >
          Next
        </button>
      </div>

      {/* desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm">
          <span>Showing&nbsp;</span>
          <span className="font-semibold">{(page - 1) * perPage + 1}</span>
          <span>&nbsp;to&nbsp;</span>
          <span className="font-semibold">
            {page * perPage <= totalItems ? page * perPage : totalItems}
          </span>
          <span>&nbsp;of&nbsp;</span>
          <span className="font-semibold">{totalItems}</span>
          <span>&nbsp;results</span>
        </p>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="btn btn-outline rounded-l-full rounded-r-none ring-gray-300 dark:ring-gray-700"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {pagination(page, totalPages).map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => typeof i === "number" && setPage(i)}
                aria-current={page === i ? "page" : undefined}
                className={clsx(
                  "btn btn-outline rounded-none px-4 py-2 ring-gray-300 dark:ring-gray-700",
                  {
                    "bg-primary text-on-primary ring-primary": page === i,
                  },
                  {
                    "cursor-default focus:outline-none": typeof i !== "number",
                  },
                )}
              >
                {i}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="btn btn-outline rounded-l-none rounded-r-full ring-gray-300 dark:ring-gray-700"
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
