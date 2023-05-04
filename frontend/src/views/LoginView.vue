<template>
  <main class="pt-16">
    <section id="login" v-if="! waitingOnVerification">
      <h1 class="text-3xl font-semibold mb-4">Enter your phone number</h1>
      <form action="#" @submit.prevent="login">
        <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
          <div class="bg-white px-4 py-5 sm:p-6">
            <input type="text" name="phone" id="phone" placeholder="1 (234) 567-8918"
                   v-maska data-maska="# (###) ### ####"
                   v-model="credentials.phone"
                     class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
          </div>

          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button type="submit" @submit.prevent="login"
                    class="inline-flex justify-end rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
              Login
            </button>
          </div>

        </div>
      </form>
    </section>
    <section id="verify" v-else>
      <h1 class="text-3xl font-semibold mb-4">Enter your verification code</h1>
      <form action="#" @submit.prevent="verify">
        <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
          <div class="bg-white px-4 py-5 sm:p-6">
            <input type="text" name="phone" id="phone" placeholder="123456"
                   v-maska data-maska="######"
                   v-model="credentials.login_code"
                     class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:outline-none">
          </div>

          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button type="submit" @submit.prevent="verify"
                    class="inline-flex justify-end rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
              Verify
            </button>
          </div>

        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { vMaska } from "maska"
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter()

const credentials = reactive({
  phone: null,
  login_code: null
})

const waitingOnVerification = ref(false)

onMounted(() => {
  if (localStorage.getItem('token')){
    router.push({
      name: 'landing'
    })
  }
})
const login = () => {
  axios.post('http://127.0.0.1:8000/api/login', {
    phone: credentials.phone.replaceAll(' ', '').replace('(', '').replace(')', '').replace('-', ''),
  })
      .then((response) => {
        console.log(response.data)
        waitingOnVerification.value = true
      })
      .catch((error) => {
        console.log(error)
        alert(error.response.data.message)
      })
}

const verify = () => {
  axios.post('http://127.0.0.1:8000/api/login/verify', {
    phone: credentials.phone.replaceAll(' ', '').replace('(', '').replace(')', '').replace('-', ''),
    login_code: credentials.login_code
  })
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('token',response.data)
        router.push({
          name: 'landing'
        })
      })
      .catch((error) => {
        console.log(error)
        alert(error.response.data.message)
      })
}
</script>

