<template>
    <li class="md:hidden">
        <NuxtLink :href="href"
            class="block py-1 text-sm transition text-zinc-400 hover:text-white">
                <slot></slot>
        </NuxtLink>
    </li>
</template>

<script setup>
const props = defineProps(['href', 'children']);
</script>
