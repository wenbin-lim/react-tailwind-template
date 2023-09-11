import { Fragment } from "react";
import clsx from "clsx";

import { useFloating, autoUpdate, Placement, flip } from "@floating-ui/react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

type Action = {
  label: string;
  callback: () => void;
};

interface MenuDropdownProps {
  triggerButton?: JSX.Element | React.ReactNode;
  actions: Action[];
  menuPlacement?: Placement;
  menuMinWidth?: number;
  menuMaxWidth?: number;
}

const MenuDropdown = ({
  actions,
  triggerButton,
  menuPlacement = "left-start",
  menuMinWidth = 100,
  menuMaxWidth = 250,
}: MenuDropdownProps) => {
  const { refs, floatingStyles } = useFloating({
    placement: menuPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
  });

  return (
    <Menu>
      <Menu.Button ref={refs.setReference} type="button">
        <span className="sr-only">Open menu</span>
        {triggerButton || (
          <div className="-m-2 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </div>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition-opacity ease-out duration-300"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition-opacity ease-in duration-100"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Menu.Items
          className="overflow-hidden rounded-md bg-gray-50 shadow-lg ring-1 ring-gray-900/5"
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            minWidth: menuMinWidth,
            maxWidth: menuMaxWidth,
          }}
        >
          {actions.map(({ label, callback }) => (
            <Menu.Item key={label}>
              {({ active }) => (
                <button
                  type="button"
                  className={clsx(
                    "block w-full overflow-hidden truncate px-3 py-1 text-left text-sm leading-6",
                    active ? "bg-gray-100 text-black" : "text-black",
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
export default MenuDropdown;
