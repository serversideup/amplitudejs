<template>
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5">
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"/>
    </svg>
</template>

<script setup>
const props = defineProps({
    variant: {
        default: ''
    },
    arrow: {
        default: ''
    }
});
</script>