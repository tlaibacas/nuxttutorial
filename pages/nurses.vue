<template>
  <v-container>
    <h1 class="text-h5 mb-4">Nurses</h1>

    <v-card class="mb-4">
      <v-card-title class="text-h6">
        List of nurses
        <v-chip class="ml-2" color="success" small>
          {{ totalNurses }}
        </v-chip>
      </v-card-title>

      <v-list v-if="paginatedNurses.length">
        <v-list-item v-for="nurse in paginatedNurses" :key="nurse.id">
          <v-list-item-title>
            {{ nurse.properties.firstname }} {{ nurse.properties.lastname }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="nurse.properties.email">
            {{ nurse.properties.email }}
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
          @click="loadReadyNurses"
          class="mt-4"
        >
          {{ nurses.length ? "Refresh List" : "Load nurse list" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
interface Nurse {
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
const totalNurses = ref(0);

const nurses = ref<Nurse[]>([]);
const pending = ref(false);

const loadReadyNurses = async () => {
  pending.value = true;
  try {
    let allNurses: Nurse[] = [];
    let after: string | undefined;

    do {
      const { data } = await useFetch<{
        data: Nurse[];
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
        allNurses = [...allNurses, ...data.value.data];
        after = data.value.paging?.next?.after;
      } else {
        after = undefined;
      }
    } while (after);

    nurses.value = allNurses;
    totalNurses.value = nurses.value.length;
    totalPages.value = Math.ceil(totalNurses.value / itemsPerPage.value);
  } catch (error) {
    console.error("Error loading nurses:", error);
  } finally {
    pending.value = false;
  }
};

const loadPage = (newPage: number) => {
  currentPage.value = newPage;
};

const paginatedNurses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return nurses.value.slice(start, end);
});
watch(nurses, (newNurses) => {
  console.log("Nurses JSON:", JSON.stringify(newNurses, null, 2));
});
</script>
