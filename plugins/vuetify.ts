import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: { mdi },
    },
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#1976D2",
            secondary: "#424242",
          },
        },
      },
    },
    defaults: {
      VBtn: { variant: "flat" },
      VCard: { elevation: 2 },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
