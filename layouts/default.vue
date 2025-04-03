<template>
  <VLayout>
    <VAppBar color="primary">
      <Header />
    </VAppBar>

    <VMain>
      <VContainer>
        <NuxtPage />
      </VContainer>
    </VMain>

    <VFooter app color="secondary">
      <Footer />
    </VFooter>
  </VLayout>
</template>

<script setup>
import {
  VLayout,
  VAppBar,
  VMain,
  VContainer,
  VFooter,
} from "vuetify/components";
</script>
