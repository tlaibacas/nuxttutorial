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
            primary: "#2C0099",
            secondary: "#FF4081",
            background: "#FFFFFF",
            surface: "#F5F5F5",
            info: "#03A9F4",
            warning: "#FFE0B2",
            error: "#FF5252",
            success: "#4CAF50",
            purple: "#9C27B0",
          },
        },
      },
    },
    defaults: {
      global: {
        ripple: false,
      },
      VApp: {
        background: "#F5F5F5",
      },
      VBtn: {
        variant: "flat",
        color: "primary",
        rounded: "lg",
        class: "text-capitalize",
      },
      VCard: {
        elevation: 2,
        color: "background",
        rounded: "lg",
        class: "pa-4",
      },
      VAppBar: {
        color: "primary",
        flat: true,
      },
      VFooter: {
        color: "secondary",
        border: true,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
