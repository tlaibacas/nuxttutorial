export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["vuetify/styles", "leaflet/dist/leaflet.css"],
  build: {
    transpile: ["vuetify", "@vue-leaflet/vue-leaflet"],
  },
  modules: ["@nuxtjs/leaflet"],
  vite: {
    define: {
      "process.env.DEBUG": "false",
    },
  },
  runtimeConfig: {
    hubspotAccessToken: process.env.NUXT_HUBSPOT_ACCESS_TOKEN,
  },
});
