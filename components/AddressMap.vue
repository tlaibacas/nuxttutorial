<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="searchQuery"
          label="Search for a place"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="searchPlace">Search</v-btn>
      </v-col>
      <v-col cols="12">
        <div id="map" style="height: 400px"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      map: null,
      marker: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const paris = { lat: 48.8566, lng: 2.3522 };
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: paris,
        zoom: 12,
      });
      this.marker = new google.maps.Marker({
        position: paris,
        map: this.map,
      });
    },
    searchPlace() {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.searchQuery }, (results, status) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          this.map.setCenter(location);
          this.marker.setPosition(location);
        } else {
          alert("Place not found: " + status);
        }
      });
    },
  },
};
</script>

<style scoped>
#map {
  border: 1px solid #ccc;
}
</style>
