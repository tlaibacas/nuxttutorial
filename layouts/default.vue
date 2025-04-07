<template>
  <VApp>
    <VAppBar density="comfortable">
      <Header />
    </VAppBar>

    <VMain>
      <VContainer class="py-8">
        <NuxtPage />
      </VContainer>
    </VMain>

    <Footer />
  </VApp>
</template>

<script setup>
import { VApp, VAppBar, VMain, VContainer, VFooter } from "vuetify/components";
</script>
