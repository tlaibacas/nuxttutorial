<template>
  <div>
    <v-text-field
      v-model="state.address"
      label="Enter an address"
      outlined
      clearable
      @keyup.enter="searchAddress"
      class="mb-4"
    ></v-text-field>

    <v-btn
      color="primary"
      @click="searchAddress"
      :loading="state.loading"
      class="mb-4"
      :disabled="!state.address"
    >
      Search on Map
    </v-btn>

    <v-alert v-if="state.error" type="error" class="mb-4">
      {{ state.error }}
    </v-alert>

    <v-card outlined>
      <div v-if="mapReady" style="height: 400px">
        <l-map
          ref="map"
          :zoom="state.zoom"
          :center="state.center"
          :use-global-leaflet="false"
          @ready="onMapReady"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          <l-marker :lat-lng="state.markerPosition" v-if="state.markerPosition">
            <l-popup>{{ state.currentAddress }}</l-popup>
          </l-marker>
        </l-map>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useMapController } from "~/utils/geocoding";

const { state, map, mapReady, searchAddress, onMapReady } = useMapController();
</script>
