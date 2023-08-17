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
      "rounded-lg bg-background px-4 pb-4 pt-5 text-left shadow-xl mt-auto sm:m-0 sm:w-full sm:max-w-lg sm:p-6 gap-y-2",
    icon: "my-0 text-xs",
    // closeButton:
    //   "!hidden sm:!flex text-[36px] font-thin text-gray-500 hover:text-on-background",
    title:
      "p-0 text-center text-base font-semibold leading-6 text-on-background",
    htmlContainer: "!m-0 !text-sm !text-gray-500",
    actions: "m-0 mt-5 sm:mt-4 flex flex-col gap-2 sm:flex-row text-sm",
    confirmButton:
      "order-3 m-0 px-3 py-2 w-full sm:flex-1 sm:min-w-[80px] rounded-btn font-semibold shadow-sm bg-primary text-on-primary hover:opacity-90",
    denyButton:
      "order-2 m-0 px-3 py-2 w-full sm:flex-1 sm:min-w-[80px] rounded-btn font-semibold shadow-sm bg-red-600 text-white hover:bg-red-500",
    cancelButton:
      "order-1 m-0 px-3 py-2 w-full sm:flex-1 sm:min-w-[80px] rounded-btn font-semibold shadow-sm bg-background text-on-background ring-1 ring-inset ring-gray-300 hover:bg-surface hover:text-gray-500",
  },
  showClass: {
    popup: "animate__animated animate__fadeIn",
    // backdrop: "animate__animated animate__fadeIn",
    icon: "animate__animated animate__fadeIn",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOut",
    // backdrop: "animate__animated animate__fadeOut",
    icon: "animate__animated animate__fadeOut",
  },
});

export const swalWarnDeleteOption: SweetAlertOptions = {
  title: "Are you sure?",
  text: "This action is irreversible",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Ok",
};

export default swal;
