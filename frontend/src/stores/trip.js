import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useTripStore = defineStore('trip', () => {
  const id = ref(null)
  const user_id = ref(null)

  const origin = reactive({
    lat: null,
    lng: null
  })

  const destination = reactive({
    lat: null,
    lng: null
  })

  const driver_location = reactive({
    lat: null,
    lng: null
  })

  const destination_name = ref('')
  const is_started = ref(false)
  const is_complete = ref(false)

  const driver = reactive({
    id: null,
    year: null,
    make: null,
    model: null,
    licence_plate: null,
    user: {
      name: null
    }
  })
  const reset = () => {
    id.value = null
    user_id.value = null

    origin.lat = null
    origin.lng = null
    destination.lat = null
    destination.lng = null
    driver_location.lat = null
    driver_location.lng = null

    destination_name.value = ''

    driver.id = null
    driver.year = null
    driver.make = null
    driver.model = null
    driver.licence_plate = null
    driver.user.name = null
    is_started.value = false
    is_complete.value = false
  }

  return { id, user_id, origin, destination, destination_name,driver_location, reset, driver, is_complete, is_started}
})
