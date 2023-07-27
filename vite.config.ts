import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    plugins: [react(), svgr()],
    server: {
      port: parseInt(env.VITE_SERVER_PORT),
      strictPort: true,
    },
    resolve: {
      alias: {
        "@root": "/src",
      },
    },
  };
});
