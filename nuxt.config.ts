import { defineNuxtConfig } from "nuxt/config";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [],
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    plugins: [
      vuetify({
        styles: {
          configFile: "path/to/your/vuetify/styles.scss",
        },
      }),
    ],
  },
});
