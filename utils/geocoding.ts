import type L from "leaflet";
import { ref, onMounted, type Ref } from "vue";

export interface MapLocation {
  lat: number;
  lon: number;
  address: string;
}

export interface MapState {
  address: string;
  currentAddress: string;
  loading: boolean;
  error: string;
  zoom: number;
  center: [number, number];
  markerPosition: [number, number] | null;
}

export async function geocodeAddress(
  address: string
): Promise<MapLocation | null> {
  if (!address) throw new Error("Address is required");

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          "User-Agent": "YourAppName (your@email.com)",
        },
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      address: data[0].display_name || address,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

export function flyToLocation(map: any, location: MapLocation, zoom = 15) {
  const leafletMap = map?.leafletObject || map;
  if (leafletMap?.flyTo) {
    leafletMap.flyTo([location.lat, location.lon], zoom);
  }
}

export function useMapController() {
  const state = ref<MapState>({
    address: "",
    currentAddress: "",
    loading: false,
    error: "",
    zoom: 13,
    center: [48.8566, 2.3522],
    markerPosition: null,
  });

  const map: Ref<any> = ref(null);
  const mapReady = ref(false);

  onMounted(() => {
    mapReady.value = true;
  });

  async function searchAddress() {
    if (!state.value.address) {
      state.value.error = "Please enter an address";
      return;
    }

    state.value.loading = true;
    state.value.error = "";

    try {
      const location = await geocodeAddress(state.value.address);

      if (location) {
        state.value.markerPosition = [location.lat, location.lon];
        state.value.center = [location.lat, location.lon];
        state.value.currentAddress = location.address;

        if (map.value) {
          flyToLocation(map.value, location);
        }
      } else {
        state.value.error = "Address not found";
        state.value.markerPosition = null;
      }
    } catch (err) {
      state.value.error =
        err instanceof Error ? err.message : "Error searching for address";
      console.error("Search error:", err);
    } finally {
      state.value.loading = false;
    }
  }

  function onMapReady(leafletMap: L.Map) {
    map.value = leafletMap;
  }

  return {
    state,
    map,
    mapReady,
    searchAddress,
    onMapReady,
  };
}
