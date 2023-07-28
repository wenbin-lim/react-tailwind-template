import { RouterProvider } from "@root/routes";
import AuthProvider from "@root/providers/authProvider";

// Toasts
import { Toaster } from "@root/components/common/Toaster";

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
