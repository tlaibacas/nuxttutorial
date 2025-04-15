<template>
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-6 text-center">
            <v-card-title class="text-h4 mb-4">
              Start Scraping
            </v-card-title>
  
            <v-card-text class="text-body-1">
              This page is a scraper for the website.
            </v-card-text>
  
            <v-btn
              color="primary"
              :loading="loading"
              class="mt-4"
              @click="startScraping"
            >
              Scrape Now
            </v-btn>
  
            <v-alert
              v-if="scrapingResult"
              color="secondary"
              class="mt-4"
              elevation="2"
            >
              {{ scrapingResult }}
            </v-alert>
  
            <v-alert
              v-if="errorMessage"
              type="error"
              class="mt-4"
              elevation="2"
            >
              <strong>Error:</strong> {{ errorMessage }}
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const loading = ref(false);
  const scrapingResult = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  
  const startScraping = async (): Promise<void> => {
    loading.value = true;
    scrapingResult.value = null;
    errorMessage.value = null;
  
    try {
      const response = await fetch('/api/scrapping/scraping');

      const data = await response.json();
  
      if (response.ok) {
        scrapingResult.value = data.title;
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'An error occurred during scraping';
    } finally {
      loading.value = false;
    }
  };
  </script>
  