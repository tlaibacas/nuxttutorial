<template>
  <v-app-bar-title class="font-weight-bold text-h5">
    My Nuxt App
  </v-app-bar-title>

  <v-spacer />

  <v-btn
    v-for="(link, index) in links"
    :key="index"
    :to="link.to"
    variant="text"
    color="on-primary"
    class="mx-1"
  >
    {{ link.text }}
  </v-btn>
</template>

<script setup lang="ts">
const links = [
  { text: "Home", to: "/" },
  { text: "About", to: "/about" },
  { text: "Contact", to: "/contact" },
];
</script>
