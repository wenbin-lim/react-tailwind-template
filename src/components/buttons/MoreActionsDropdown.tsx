import { Fragment } from "react";
import clsx from "clsx";

import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

type Action = {
  label: string;
  callback: () => void;
};

interface MoreActionsDropdownProps {
  actions: Action[];
}

const MoreActionsDropdown = ({ actions }: MoreActionsDropdownProps) => {
  return (
    <Menu as="div" className="relative flex-none">
      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "absolute right-0 z-10 mt-2 min-w-[128px] max-w-[256px] origin-top-right rounded-md bg-surface py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none",
          )}
        >
          {actions.map(({ label, callback }, index) => (
            <Menu.Item key={`more-actions-dropdown-menu-item-${index}`}>
              {({ active }) => (
                <button
                  className={clsx(
                    "block w-full overflow-hidden truncate px-3 py-1 text-left text-sm leading-6",
                    active
                      ? "bg-background text-on-background"
                      : "text-on-surface",
                  )}
                  onClick={callback}
                >
                  {label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default MoreActionsDropdown;
