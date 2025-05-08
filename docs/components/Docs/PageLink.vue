<template>
    <AppLink
        :href="page._path"
        :variant="'secondary'"
        :arrow="previous ? 'left' : 'right'">
            {{ label }}
    </AppLink>
    <NuxtLink 
        :to="page._path"
        tab-index="-1"
        aria-hidden="true"
        class="text-base font-semibold transition text-white hover:text-zinc-300">
            {{  page.title  }}
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    label: {
        default: ''
    },
    page: {
        default(){
            return {}
        }
    },
    previous: {
        default: false
    }
});

</script>