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
          :loading="pending"
          @click="loadReadyCaregivers"
          class="mt-4"
        >
          {{ caregivers.length ? "Refresh List" : "Load caregiver list" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
interface Caregiver {
  id: string;
  properties: {
    firstname: string;
    lastname: string;
    email?: string;
    job_title?: string;
    recommendation_ready?: string;
  };
}

const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = ref(0);
const totalCaregivers = ref(0);

const caregivers = ref<Caregiver[]>([]);
const pending = ref(false);

const loadReadyCaregivers = async () => {
  pending.value = true;
  try {
    let allCaregivers: Caregiver[] = [];
    let after: string | undefined;

    do {
      const { data } = await useFetch<{
        data: Caregiver[];
        paging?: { next?: { after: string } };
      }>("/api/hubspot/contacts", {
        query: {
          properties: "firstname,lastname,email,recommendation_ready",
          recommendation_ready: "true",
          limit: 100,
          after,
        },
      });

      if (data.value?.data) {
        allCaregivers = [...allCaregivers, ...data.value.data];
        after = data.value.paging?.next?.after;
      } else {
        after = undefined;
      }
    } while (after);

    caregivers.value = allCaregivers;
    totalCaregivers.value = caregivers.value.length;
    totalPages.value = Math.ceil(totalCaregivers.value / itemsPerPage.value);
  } catch (error) {
    console.error("Error loading caregivers:", error);
  } finally {
    pending.value = false;
  }
};

const loadPage = (newPage: number) => {
  currentPage.value = newPage;
};

const paginatedCaregivers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return caregivers.value.slice(start, end);
});
</script>
