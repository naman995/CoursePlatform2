import { defineConfig } from "vite";
// import { config } from 'dotenv';
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default async () => {
  // await config({ path: path.resolve(__dirname, "env", ".env") });

  return defineConfig({
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    plugins: [react()],
    define: {
      // By default, Vite doesn't include shims for NodeJS/
      // necessary for segment analytics lib to work
      global: {},
    },
  });
}
