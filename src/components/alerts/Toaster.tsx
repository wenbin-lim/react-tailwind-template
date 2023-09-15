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
        duration: 6000, // 6 seconds
        className:
          "rounded-md p-4 !bg-background !text-on-background max-sm:!flex-1 max-sm:!max-w-full sm:!max-w-screen-sm",
        success: {
          className: "rounded-md p-4 !bg-green-50 !text-green-800",
        },
        error: {
          className: "rounded-md p-4 !bg-red-50 !text-red-800",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex flex-1 place-items-center gap-x-3">
              {icon}
              <div className="text-sm font-medium">
                {resolveValue(message, t)}
              </div>
              {t.type !== "loading" && (
                <div className="ml-auto">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className={clsx(
                        "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                        {
                          "hover:bg-green-100  focus:ring-green-600  focus:ring-offset-green-50":
                            t.type === "success",
                          "hover:bg-red-100  focus:ring-red-600  focus:ring-offset-red-50":
                            t.type === "error",
                          "hover:bg-surface focus:ring-focus  focus:ring-offset-surface":
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
