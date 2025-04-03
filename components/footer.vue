<template>
  <v-footer
    app
    color="surface-variant"
    class="d-flex justify-center align-center py-4"
  >
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="12" class="text-center">
          <p class="text-medium-emphasis">
            © {{ new Date().getFullYear() }} My Nuxt Tutorial
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
