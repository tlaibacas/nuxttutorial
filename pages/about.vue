<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h3 text-primary"> About Us </v-card-title>

          <v-card-text class="text-body-1">
            <v-icon
              icon="mdi-information-outline"
              size="x-large"
              color="primary"
              class="mr-2"
            />
            Welcome to the About page! Learn more about our mission and values.
          </v-card-text>

          <AddressMap />

          <v-card-actions class="justify-end mt-4">
            <v-btn
              to="/"
              prepend-icon="mdi-home"
              variant="tonal"
              color="purple"
            >
              Back to Home
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
