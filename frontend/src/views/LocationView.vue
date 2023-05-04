<template>
  <main class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Where are we going?</h1>
    <form action="#">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-white px-4 py-5 sm:p-6">
<!--          <GMapAutocomplete-->
<!--              @place_changed="locationChanged"-->
<!--              placeholder="My destination"-->
<!--              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none"-->
<!--          ></GMapAutocomplete>-->
          <vue-google-autocomplete
              id="address"
              ref="autocompleteValue"
              country="ca"
              v-on:placechanged="locationChanged"
              placeholder="My destination"
              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none"
          ></vue-google-autocomplete>
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
import VueGoogleAutocomplete from "vue-google-autocomplete";
import {onMounted, ref} from "vue";
import {useLocationStore} from "@/stores/location";
import {useRouter} from "vue-router";

const router = useRouter()
const location = useLocationStore()
const autocompleteValue = ref(null)

onMounted(() => {
  autocompleteValue.value.focus()
})
const locationChanged = (addressData, placeResultData, id) => {
  console.log(addressData)
  console.log(placeResultData)
  location.$patch({
    destination: {
      name: placeResultData.name,
      address: placeResultData.formatted_address,
      geometry: {
        lat: addressData.latitude,
        lng: addressData.longitude
      },
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
