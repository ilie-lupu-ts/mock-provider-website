import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteReact from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { fileURLToPath, URL } from "node:url";
import contentCollections from "@content-collections/vite";
import { basename } from "node:path";

export default defineConfig({
  // Set base for GitHub Pages. In Actions, prefer GITHUB_REPOSITORY to detect user/organization pages.
  // - User/Org Pages (repo ends with .github.io): base should be '/'
  // - Project Pages: base should be '/<repo>/'
  base: (() => {
    if (process.env.GITHUB_ACTIONS) {
      const repo =
        process.env.GITHUB_REPOSITORY?.split("/")[1] ?? basename(process.cwd());
      return repo.endsWith(".github.io") ? "/" : `/${repo}/`;
    }
    return "/";
  })(),
  plugins: [
    devtools(),
    contentCollections(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
