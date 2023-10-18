import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "@src/components/ui/button";

/**
 * @see https://sweetalert2.github.io/#configuration
 * @see https://github.com/sweetalert2/sweetalert2-react-content
 */

const baseSwal = withReactContent(Swal).mixin({
  buttonsStyling: false,
  customClass: {
    container: "z-modal backdrop-blur-sm !bg-background/80",
    popup:
      "w-full max-w-lg bg-background outline outline-1 outline-border shadow-lg rounded-lg p-4 sm:p-6 text-foreground",
    title: "p-0 text-lg font-semibold text-left leading-8 mb-2",
    htmlContainer: "!m-0 !text-sm !text-muted-foreground !text-left",
    actions: "flex flex-col gap-2 sm:flex-row-reverse sm:!justify-start w-full",
  },
  showClass: {
    backdrop: "animate__animated animate__fadeIn",
    popup: "animate__animated animate__fadeIn",
    icon: "",
  },
  hideClass: {
    backdrop: "animate__animated animate__fadeOut",
    popup: "animate__animated animate__fadeOut",
    icon: "",
  },
});

const warn = withReactContent(baseSwal).mixin({
  title: "Are you sure?",
  text: "This action cannot be undone.",
  confirmButtonText: (
    <Button asChild>
      <span>Continue</span>
    </Button>
  ),
  cancelButtonText: (
    <Button asChild variant="outline">
      <span>Cancel</span>
    </Button>
  ),
  showCancelButton: true,
});

export { baseSwal, warn };
