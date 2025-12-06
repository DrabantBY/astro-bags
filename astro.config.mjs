// @ts-check
import { defineConfig, envField } from "astro/config";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      API_URL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },

  integrations: [solidJs({ devtools: true })],

  compressHTML: false,

  build: {
    format: "preserve",
    assets: "assets",
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash][extname]",
        },
      },
    },
  },

  experimental: {
    chromeDevtoolsWorkspace: true,
    fonts: [
      {
        name: "Flecha",
        cssVariable: "--font-flecha",
        provider: "local",
        variants: [
          {
            src: ["./src/assets/fonts/FlechaLight.otf"],
          },
        ],
      },

      {
        name: "MaisonMono",
        cssVariable: "--font-maison-mono",
        provider: "local",
        variants: [
          {
            src: [
              "./src/assets/fonts/MaisonMono.woff2",
              "./src/assets/fonts/MaisonMono.woff",
            ],
          },
        ],
      },

      {
        name: "MaisonLight",
        cssVariable: "--font-maison-light",
        provider: "local",
        variants: [
          {
            src: [
              "./src/assets/fonts/MaisonLight.woff2",
              "./src/assets/fonts/MaisonLight.woff",
            ],
          },
        ],
      },
    ],
  },
});
