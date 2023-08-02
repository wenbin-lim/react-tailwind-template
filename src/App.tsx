import RouterProvider from "@root/routes/RouterProvider";
import { AuthProvider } from "@root/features/auth";

// Toasts
import { Toaster } from "@root/components";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider />
      <Toaster />
    </AuthProvider>
  );
};
export default App;
