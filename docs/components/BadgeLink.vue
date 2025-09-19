<template>
    <NuxtLink :to="link" class="py-[2px] px-[6px] rounded-md font-medium text-xs text-[#CECFD2] font-sans inline-flex items-center border border-[#373A41] hover:border-[#61656C] transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" class="mr-1">
            <circle cx="4.00001" cy="4" r="3" :fill="color"/>
        </svg>

        {{ label }}
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})
</script>