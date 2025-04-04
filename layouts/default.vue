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

    <VFooter class="mt-8">
      <Footer />
    </VFooter>
  </VApp>
</template>

<script setup>
import { VApp, VAppBar, VMain, VContainer, VFooter } from "vuetify/components";
</script>
