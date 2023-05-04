<template>
  <main class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Here's your trip</h1>
    <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
      <div class="bg-white px-4 py-5 sm:p-6">
        <div>
          <GoogleMap
              api-key="AIzaSyBTbZ2Q21n0uIW5Dyf_bw60I47pCkaKSbY"
              style="width: 100%; height: 250px"
              :center="center"
              :zoom="11"
          >
            <Marker               ref="gMap"
                                  :options="{ position: center}" />
            <Marker v-if="currentLocation" :options="{ position: currentLocation.value }" />
          </GoogleMap>
        </div>
        <div class="mt-2">
          <p class="text-2xl">Going to <strong>{{ location.destination.name }}</strong></p>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
            class="inline-flex justify-end rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
          Let's go
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import {useLocationStore} from "@/stores/location";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import { GoogleMap, Marker } from 'vue3-google-map'


const location = useLocationStore()
const router = useRouter()

const center = { lat: location.destination.geometry.lat, lng: location.destination.geometry.lng }
const currentLocation = ref(null)
const gMap = ref(null);


onMounted(async () => {
  // does the user have a location set?
  if (location.destination.name === '') {
    await router.push({
      name: 'location'
    })
  }

  await location.updateCurrentLocation()
  currentLocation.value = location.current.geometry
  console.log(currentLocation)
  // draw a path on the map
  gMap.value.$mapPromise?.then((mapObject) => {
    let currentPoint = new google.maps.LatLng(location.current.geometry),
        destinationPoint = new google.maps.LatLng(location.destination.geometry),
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
          map: mapObject
        })
    directionsService.route({
      origin: currentPoint,
      destination: destinationPoint,
      avoidTolls: false,
      avoidHighways: false,
      travelMode: google.maps.TravelMode.DRIVING
    }, (res, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res)
      } else {
        console.error(status)
      }
    })
  })
})
</script>
