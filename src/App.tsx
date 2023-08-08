// React router
import RouterProvider from "@src/routes/RouterProvider";

// Auth
import { AuthProvider } from "@src/features/auth/provider";

// React query
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@src/lib/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Toasts
import { Toaster } from "@src/components/alerts";

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
      </QueryClientProvider>
    </AuthProvider>
  );
};
export default App;
