<template>
    <blockquote class="not-prose text-[#F7F7F7] font-medium italic text-xl pl-5 border-l-2 border-[#CECFD2] lg:text-2xl">
        <slot/>
        <div class="font-sans text-[#CECFD2] font-normal text-sm lg:text-base not-italic mt-4 lg:mt-8">- {{ author }}</div>
    </blockquote>
</template>

<script setup>
defineProps({
    author: {
        type: String,
        required: true,
    },
})
</script>

