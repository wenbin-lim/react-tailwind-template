import clsx from "clsx";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusSmallIcon,
} from "@heroicons/react/20/solid";

/* 
  Example:

  <SortableTH
    className="py-3 pl-4 pr-3 sm:pl-0"
    onClick={() => {
      if (sort === "name") {
        setSort("-name");
      } else if (sort === "-name") {
        setSort("name");
      } else {
        setSort("-name");
      }
    }}
    active={sort === "name" || sort === "-name"}
    direction={sort === "name" ? "asc" : sort === "-name" ? "desc" : "none"}
  >
    Name
  </SortableTH>
*/
type SortableTHProps = {
  /** To hide or show the arrow icon */
  active?: boolean;
  /** Direction of arrow icon */
  direction?: "asc" | "desc" | "none";
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const SortableTH = ({
  active,
  direction = "desc",
  className,
  onClick,
  children,
}: SortableTHProps) => {
  return (
    <th className={clsx(className)} scope="col" onClick={onClick}>
      <div className="group flex cursor-pointer items-center gap-x-2">
        {children && <span>{children}</span>}
        <span
          className={clsx(
            "flex-none rounded",
            active
              ? "bg-gray-200 text-gray-900 group-hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-50 dark:group-hover:bg-gray-700"
              : "invisible text-gray-400 group-hover:visible group-focus:visible dark:text-gray-600",
          )}
        >
          {direction === "asc" && <ChevronUpIcon className="h-5 w-5" />}
          {direction === "desc" && <ChevronDownIcon className="h-5 w-5" />}
          {direction === "none" && <MinusSmallIcon className="h-5 w-5" />}
        </span>
      </div>
    </th>
  );
};
export default SortableTH;
