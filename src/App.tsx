import { RouterProvider } from "@root/routes";
import { AuthProvider } from "@root/features/auth";

// Toasts
import { Toaster } from "@root/components";

interface Props {}
const App = ({}: Props) => {
  return (
    <AuthProvider>
      <RouterProvider />
      <Toaster />
    </AuthProvider>
  );
};
export default App;
