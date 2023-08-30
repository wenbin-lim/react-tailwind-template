export const getGenericToastMessage = (type: "success" | "error") => {
  switch (type) {
    case "success":
      return "You have successfully completed the action!";
    case "error":
      return "Something went wrong, please try again later or contact support for help";
    default:
      return "Default message";
  }
};
