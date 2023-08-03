import RouterProvider from "@src/routes/RouterProvider";
import { AuthProvider } from "@src/features/auth";

// Toasts
import { Toaster } from "@src/components";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider />
      <Toaster />
    </AuthProvider>
  );
};
export default App;
