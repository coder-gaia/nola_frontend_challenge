import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      all: true,
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx", "src/index.jsx"],
    },
  },
});
