<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-6 text-center">
          <v-card-title class="text-h3 mb-4"> About Us </v-card-title>

          <v-card-text class="text-body-1">
            Welcome to the About page! Learn more about our mission and values.
          </v-card-text>
          <AddressMap />
          <v-card-actions class="justify-center mt-4">
            <v-btn color="primary" variant="flat" to="/"> Back to Home </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AddressMap from "~/components/AddressMap.vue";
</script>
