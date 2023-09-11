import Swal, { SweetAlertOptions } from "sweetalert2";

/* 
	https://sweetalert2.github.io/#configuration
*/
const swal = Swal.mixin({
  buttonsStyling: false,
  customClass: {
    container:
      "flex justify-center z-modal transition duration-500 backdrop-blur-sm !bg-modal-backdrop dark:!bg-modal-backdrop-dark",
    popup:
      "rounded-lg bg-background px-8 py-4 text-left shadow-xl mt-auto sm:m-0 sm:w-full sm:max-w-lg sm:p-6 gap-y-2",
    icon: "my-0 text-[0.5rem]",
    // closeButton:
    //   "!hidden sm:!flex text-[36px] font-thin text-gray-500 hover:text-on-background",
    title:
      "p-0 text-center text-2xl font-semibold leading-6 text-on-background",
    htmlContainer: "!m-0 !text-sm !text-gray-500",
    actions: "m-0 mt-6 flex flex-col gap-3 sm:flex-row text-sm",
    cancelButton:
      "order-1 w-full sm:w-32 max-w-xs btn btn-outline ring-gray-300 dark:ring-gray-700",
    denyButton:
      "order-2 w-full sm:w-32 max-w-xs btn bg-red-600 text-white hover:bg-red-500",
    confirmButton:
      "order-3 w-full sm:w-32 max-w-xs btn bg-primary text-on-primary",
  },
  showClass: {
    popup: "animate__animated animate__fadeIn animate__zoomIn",
    icon: "animate__animated animate__fadeIn",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOut animate__zoomOut",
    icon: "animate__animated animate__fadeOut",
  },
});

export default swal;

export const swalWarnDeleteOption: SweetAlertOptions = {
  title: "Are you sure?",
  text: "This action is irreversible",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "OK",
};
