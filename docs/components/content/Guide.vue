<template>
    <div>
        <h3 class="text-sm font-semibold text-white">
            {{ name }}
        </h3>
        <p class="mt-1 text-sm text-zinc-400">
            {{ description }}
        </p>
        <p class="mt-4">
            <AppLink :href="href" :variant="'text'" :arrow="'right'">
                Read More
            </AppLink>
        </p>
    </div>
</template>

<script setup>
const props = defineProps(['name', 'description', 'href']);
</script>