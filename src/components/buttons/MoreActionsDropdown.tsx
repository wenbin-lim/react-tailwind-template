import { Fragment } from "react";
import clsx from "clsx";

import {
  useFloating,
  flip,
  autoUpdate,
  Placement,
  shift,
} from "@floating-ui/react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

type Action = {
  label: string;
  callback: () => void;
};

interface MoreActionsDropdownProps {
  triggerButton?: JSX.Element | React.ReactNode;
  actions: Action[];
  menuPlacement?: Placement;
  menuMinWidth?: number;
  menuMaxWidth?: number;
}

const MoreActionsDropdown = ({
  actions,
  triggerButton,
  menuPlacement = "left-start",
  menuMinWidth = 128,
  menuMaxWidth = 256,
}: MoreActionsDropdownProps) => {
  const { refs, floatingStyles } = useFloating({
    placement: menuPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [flip(), shift()],
  });

  return (
    <Menu as="div" className="relative flex-none">
      <Menu.Button ref={refs.setReference} type="button">
        {triggerButton || (
          <div className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition-opacity ease-out duration-300"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition-opacity ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Menu.Items
          className={clsx(
            "absolute right-0 z-popover mt-2 w-max origin-top-right rounded-md bg-surface py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none",
          )}
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            minWidth: menuMinWidth,
            maxWidth: menuMaxWidth,
          }}
        >
          {actions.map(({ label, callback }, index) => (
            <Menu.Item key={`more-actions-dropdown-menu-item-${index}`}>
              {({ active }) => (
                <button
                  type="button"
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
