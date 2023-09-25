<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import { clearUser, getUser } from '../composables/userService'
import router from '@/router';
const dropdownOpen = ref(false)
const { isOpen } = useSidebar()
function logout(){
  clearUser()
  router.push('/')
}
const user =  getUser()
</script>

<template>
   <nav class="navbar navbar-expand-md navbar-light navbar-laravel  bg-[#E4432F]">
    <div class="flex items-center">
    <div class="container p-8 ml-3">
      <a href="/dashboard" class="navbar-brand text-white font-bold text-4xl">
        Soficom Drive
        <span class="badge bg-secondary text-white rounded font-mono text-2xl p-1">BETA</span>
      </a>
    </div>
    <div class="flex items-center">
      <span class="flex mx-4 text-gray-600 focus:outline-none">
        {{ user?.user.UserName }}
      </span>

      <div class="relative">
        <button
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
          <img
            class="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Your avatar"
          >
        </button>
        <div
          v-show="dropdownOpen"
          class="fixed inset-0 z-10 w-full h-full"
          @click="dropdownOpen = false"
        />

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
          <router-link
          to="/invoice">
          <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#7188b3] cursor-pointer hover:text-white">
              Add Invoice
          </a>
          </router-link>
            <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#7188b3] cursor-pointer hover:text-white">
              Logout
          </a>
          </div>
        </transition>
      </div>
    </div>
  </div>
  </nav>
</template>
