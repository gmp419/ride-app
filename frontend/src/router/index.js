import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import LandingView from "@/views/LandingView.vue";
import axios from "axios";
import LocationView from "@/views/LocationView.vue";
import MapView from "@/views/MapView.vue";
import TripView from "@/views/TripView.vue";
import DriverView from "@/views/DriverView.vue";
import StandByView from "@/views/StandByView.vue";
import DrivingView from "@/views/DrivingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/location',
      name: 'location',
      component: LocationView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/trip',
      name: 'trip',
      component: TripView
    },
    {
      path: '/standBy',
      name: 'standBy',
      component: StandByView
    },
    {
      path: '/driver',
      name: 'driver',
      component: DriverView
    },
    {
      path: '/driving',
      name: 'driving',
      component: DrivingView
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.name === 'login') {
    return true
  }
  if (! localStorage.getItem('token')) {
    return {
      name: 'login'
    }
  }

  checkForAuthenticityOfToken()
})

const checkForAuthenticityOfToken = () => {
  axios.get('http://127.0.0.1:8000/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
      .then((response) => {})
      .catch((error) => {
        localStorage.removeItem('token')
        router.push({
          name: 'login'
        }).then(r => console.log(r))
      })
}

export default router
