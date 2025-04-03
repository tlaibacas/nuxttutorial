import { defineNuxtConfig } from "nuxt/config";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    plugins: [
      vuetify({
        autoImport: true,
        styles: { configFile: "./assets/scss/variables.scss" },
      }),
    ],
    ssr: {
      noExternal: ["vuetify"],
    },
    define: {
      "process.env.DEBUG": "false",
    },
  },

  compatibilityDate: "2025-04-03",
});
