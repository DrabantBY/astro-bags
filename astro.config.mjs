// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
    fonts: [
      {
        name: "Flecha",
        cssVariable: "--font-flecha",
        provider: "local",
        variants: [
          {
            src: [
              "./src/assets/fonts/Flecha.woff2",
              "./src/assets/fonts/Flecha.woff",
            ],
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
