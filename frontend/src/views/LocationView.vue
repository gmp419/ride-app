<template>
  <main class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Where are we going?</h1>
    <form action="#">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
          <GMapAutocomplete
              placeholder="My destination"
              @place_changed="locationChanged"
              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
          </GMapAutocomplete>
        </div>

        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
              @click.prevent="selectLocation"
              class="inline-flex justify-end rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
            Find A Ride
          </button>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import {useLocationStore} from "@/stores/location";
import {useRouter} from "vue-router";

const router = useRouter()
const location = useLocationStore()
const locationChanged = (e) => {
  console.log('locationChanged', e)
  location.$patch({
    destination: {
      name: e.name,
      address: e.formatted_address,
      geometry: {
        lat: e.geometry.location.lat(),
        lng: e.geometry.location.lng()
      }
    }
  })
}

const selectLocation = () => {
  if (location.destination.name !== ''){
    router.push({
      name: 'map'
    })
  }
}

</script>
