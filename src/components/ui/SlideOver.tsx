import { Fragment } from "react";
import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type SlideOverProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
  /**
   * tailwind max width classes
   * https://tailwindcss.com/docs/max-width
   * */
  width?: string;
};

const SlideOver = ({ open, setOpen, width, children }: SlideOverProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-modal" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500 sm:duration-700"
          enterFrom="backdrop-blur-none bg-transparent"
          enterTo="backdrop-blur-sm bg-modal-backdrop dark:bg-modal-backdrop-dark"
          leave="ease-in-out duration-500 sm:duration-700"
          leaveFrom="backdrop-blur-sm bg-modal-backdrop dark:bg-modal-backdrop-dark"
          leaveTo="backdrop-blur-none bg-transparent"
        >
          <div className="fixed inset-0 overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className={clsx(
                      "pointer-events-auto relative w-screen",
                      width ? width : "max-w-md",
                    )}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500 sm:duration-700"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500 sm:duration-700"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="focus:ring-input-focus relative rounded-md text-black focus:outline-none focus:ring-2 dark:text-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-auto bg-background shadow-xl dark:bg-background-dark">
                      {children}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
