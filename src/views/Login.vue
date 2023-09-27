<script setup lang="ts">
import { url } from '@/composables/api';
import { setUser } from '@/composables/userService';
import type { IUser, IUserApp, IUserAuth } from '@/composables/interface';
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authUser = ref<IUserAuth>({
  UserName:'',
  UserPass:''
})
const open = ref(false)
const msg = ref('')
function ser(){
  open.value = true
}
async function login() {
  const data = JSON.parse(JSON.stringify(authUser.value))
  console.log(data)
  try {
    const response = await axios.post(`${url}/login`,data);
    console.log("Réponse de l'API :", response.data);
    if(response.status == 201){
      const user : IUserApp = response.data 
      console.log("User:", user);
      router.push('/dashboard')
      setUser(user); // Mettre à jour les informations de l'utilisateur
    }
    else{
      msg.value = response.data.message
      open.value = true
    }
  } catch (error) {
    console.log("bug:", error);
    alert('User not found with data provide')
  }
}
</script>

<template>
 <nav class="navbar navbar-expand-md navbar-light navbar-laravel h-18 bg-[#E4432F]">
  <div class="container p-8 ml-3">
    <a href="https://archive.soficomit.com" class="navbar-brand text-white font-bold text-2xl">
      Soficom Drive
      <span class="badge bg-secondary text-white  font-mono ">BETA</span>
    </a>
  </div>
</nav>
<div class="flex flex-col items-center justify-center mt-8">
        <div class="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="relative px-6 py-6 bg-gray-800 h-16 text-white">
            <div class="flex flex-col md:flex-row items-center justify-center md:justify-start">
              <div>
                <h1 class="text-2xl font-bold mb-2 ">Login</h1>
              </div>
            </div>
          </div>
          <div class="overflow-hidden">
              <form class=" p-8 items-center" @submit.prevent="login">
                <div class="flex items-center p-2">
                  <span class="text-sm text-gray-700 mr-8">Username</span>
                  <input
                    v-model="authUser.UserName"
                    type="text"
                    class="block w-80  border-gray-200 rounded-md focus:border-[#2577d5] focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </div>
                <div class="flex items-center p-2">
                  <span class="text-sm text-gray-700 mr-8">Password</span>
                  <input
                    v-model="authUser.UserPass"
                    type="password"
                    class="block w-80 mt-1 border-gray-200 rounded-md focus:border-[#2577d5] focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  >
                </div>

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox" class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <span class="mx-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-75 px-4 py-2 text-sm text-center text-white bg-gray-800 rounded-md focus:outline-none "
          >
            Sign in
          </button>
        </div>
      </form>
          </div>
        </div>
      </div>
      
  <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="open = false"  @click.self="ser"
      />

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
             Error
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>
          <p>
              {{ msg }}
          </p>
        </div>
      </div>
    </div>
</template>
