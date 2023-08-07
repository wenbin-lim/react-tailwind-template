import toast, {
  Toaster as RHTToaster,
  ToastBar,
  resolveValue,
} from "react-hot-toast";

import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/20/solid";

/* 
	https://react-hot-toast.com/
	toast types: "success" | "error" | "loading" | "blank" | "custom"
*/
import { useBreakpoints } from "@src/hooks/theme";

const Toaster = () => {
  const isMobile = useBreakpoints("sm");

  return (
    <RHTToaster
      position={isMobile ? "bottom-center" : "top-right"}
      reverseOrder={true}
      toastOptions={{
        className: "rounded-md p-4 bg-surface",
        success: {
          className: "rounded-md p-4 bg-green-50",
        },
        error: {
          className: "rounded-md p-4 bg-red-50",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t} position="bottom-center">
          {({ icon, message }) => (
            <div className="flex place-items-center">
              <div className="flex-shrink-0">{icon}</div>
              <div className="ml-3">
                <div
                  className={clsx("text-sm font-medium", {
                    "text-green-800": t.type === "success",
                    "text-red-800": t.type === "error",
                    "text-on-surface":
                      t.type !== "success" && t.type !== "error",
                  })}
                >
                  {resolveValue(message, t)}
                </div>
              </div>
              {t.type !== "loading" && (
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      // className=" "
                      className={clsx(
                        "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                        {
                          "bg-green-50 first-letter:text-green-500 hover:bg-green-100  focus:ring-green-600  focus:ring-offset-green-50":
                            t.type === "success",
                          "bg-red-50 first-letter:text-red-500 hover:bg-red-100  focus:ring-red-600  focus:ring-offset-red-50":
                            t.type === "error",
                          "bg-surface hover:bg-surface focus:ring-blue-400  focus:ring-offset-surface":
                            t.type !== "success" && t.type !== "error",
                        },
                      )}
                      onClick={() => toast.dismiss(t.id)}
                    >
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </RHTToaster>
  );
};

export default Toaster;
