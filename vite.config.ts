import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { reactClickToComponent } from "vite-plugin-react-click-to-component";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    plugins: [react(), svgr(), reactClickToComponent(), pluginRewriteAll()],
    server: {
      port: parseInt(env.VITE_SERVER_PORT),
      host: true,
      // strictPort: true,
    },
    resolve: {
      alias: {
        "@src": "/src",
        "@root": "/",
        "@tailwind-config": "/tailwind.config.cjs",
      },
    },
    build: {
      rollupOptions: {
        // output: {
        //   // to split node_modules into each individual vendor chunks
        //   // use only if vite auto chunking is not optimal
        //   manualChunks(id) {
        //     if (id.includes("node_modules")) {
        //       return id
        //         .toString()
        //         .split("node_modules/")[1]
        //         .split("/")[0]
        //         .toString();
        //     }
        //   },
        // },
      },
    },
  };
});
