<template>
    <h3 :id="id">
      <a class="text-white hover:text-white hover:decoration-white hover:underline" v-if="id && generate" :href="`#${id}`">
        <slot />
      </a>
      <slot v-else />
    </h3>
  </template>
  
  <script setup lang="ts">
  import { useRuntimeConfig } from '#imports'
  defineProps<{ id?: string }>()
  const heading = 3
  const { anchorLinks } = useRuntimeConfig().public.content
  const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
  </script>