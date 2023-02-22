<template>
  <nav class="block md:hidden flex flex-row-reverse gap-4">
    <h2 class="hidden">Mobile Navigation</h2>
    <button @click="openMenu()" v-if="!menuOpen">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>  
    </button>
    <button @click="closeMenu()" v-else>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div v-if="menuOpen">
      <ul class="flex gap-4">
        <li v-for="item in items" key="item.url">
          <a :href="item.url">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  socials: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

const menuOpen = ref(false)

const openMenu = () => {
  menuOpen.value = true;
}

const closeMenu = () => {
  menuOpen.value = false;
}
</script>