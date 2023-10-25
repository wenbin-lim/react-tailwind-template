import React from "react";
import ReactDOM from "react-dom/client";
import "@src/styles/index.scss";
import "animate.css";

// Providers
import { ThemeProvider } from "@src/lib/themeProvider";
import { AuthProvider } from "@src/features/auth/provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@src/lib/reactQuery";
import RouterProvider from "@src/routes";

// init firebase
import { initFirebase } from "@src/lib/firebase";
initFirebase();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
