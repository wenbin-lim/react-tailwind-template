import clsx from "clsx";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusSmallIcon,
} from "@heroicons/react/20/solid";

type TableHeadSortProps = {
  label?: string;
  sortKey: string;
  currentSortKey: string;
  onClick: () => void;
  thClassName?: string;
};

const TableHeadSort = ({
  label,
  sortKey,
  currentSortKey,
  onClick,
  thClassName,
}: TableHeadSortProps) => {
  return (
    <th scope="col" className={clsx(thClassName)}>
      <button className="group inline-flex" onClick={onClick}>
        {label}
        <span
          className={clsx(
            "ml-2 flex-none rounded",
            currentSortKey.includes(sortKey)
              ? "bg-gray-100 text-gray-900 group-hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-50 dark:group-hover:bg-gray-700"
              : "invisible text-gray-400 group-hover:visible group-focus:visible",
          )}
        >
          {currentSortKey.includes(sortKey) ? (
            currentSortKey.includes(`-${sortKey}`) ? (
              <ChevronDownIcon className="h-5 w-5" />
            ) : (
              <ChevronUpIcon className="h-5 w-5" />
            )
          ) : (
            <MinusSmallIcon className="h-5 w-5" />
          )}
        </span>
      </button>
    </th>
  );
};
export default TableHeadSort;
