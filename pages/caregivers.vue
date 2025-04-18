<template>
  <v-container>
    <h1 class="text-h5 mb-4">Caregivers</h1>

    <v-card class="mb-4">
      <v-card-title class="text-h6">
        List of caregivers
        <v-chip class="ml-2" color="success" small>
          {{ totalCaregivers }}
        </v-chip>
      </v-card-title>

      <v-list v-if="paginatedCaregivers.length">
        <v-list-item
          v-for="caregiver in paginatedCaregivers"
          :key="caregiver.id"
        >
          <v-list-item-title>
            {{ caregiver.properties.firstname }}
            {{ caregiver.properties.lastname }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="caregiver.properties.email">
            {{ caregiver.properties.email }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="caregiver.properties.tiering_auxiliaire">
            Tiering: {{ caregiver.properties.tiering_auxiliaire }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-card-actions class="d-flex flex-column">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          color="primary"
          @update:modelValue="loadPage"
        ></v-pagination>

        <v-btn
          color="primary"
          :loading="loading"
          @click="loadReadyCaregivers"
          class="mt-4"
        >
          {{ caregivers.length ? "Refresh List" : "Load caregiver list" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type HubspotContact = {
  id: string;
  properties: {
    firstname: string;
    lastname: string;
    email: string | null;
    phone: string | null;
    type_de_contact?: string | null;
    tiering_auxiliaire: string | null;
  };
};

export default defineComponent({
  data() {
    return {
      caregivers: [] as HubspotContact[],
      currentPage: 1,
      itemsPerPage: 10,
      loading: false,
      showScrollToTop: false,
    };
  },
  computed: {
    totalCaregivers(): number {
      return this.caregivers.length;
    },
    totalPages(): number {
      return Math.ceil(this.caregivers.length / this.itemsPerPage);
    },
    paginatedCaregivers(): HubspotContact[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.caregivers.slice(startIndex, startIndex + this.itemsPerPage);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async fetchCaregivers() {
      this.loading = true;
      try {
        const data = await $fetch<{ contacts: HubspotContact[] }>(
          "/api/hubspot/contacts?type=auxiliaire de vie"
        );

        this.caregivers = data.contacts.filter(
          (c) => c.properties.tiering_auxiliaire === "T1"
        );
      } catch (error) {
        console.error("Error loading caregivers:", error);
      } finally {
        this.loading = false;
      }
    },
    loadPage(page: number) {
      this.currentPage = page;
    },
    loadReadyCaregivers() {
      this.fetchCaregivers();
    },
    handleScroll() {
      this.showScrollToTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    formatType(type?: string | null) {
      if (!type) return "Unknown";
      return type
        .split(" ")
        .map((word) =>
          ["de", "du", "la", "le"].includes(word.toLowerCase())
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    },
  },
});
</script>
