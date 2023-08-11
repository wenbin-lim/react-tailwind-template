import { Outlet } from "react-router-dom";

// React query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Toasts
import { Toaster } from "@src/components/alerts";

const App = () => {
  return (
    <>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </>
  );
};
export default App;
