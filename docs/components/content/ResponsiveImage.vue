<template>
    <p>
        <img 
            :src="src" 
            :alt="alt" 
            :class="'max-w-full md:max-w-[' + maxWidth + 'px]'"
            :style="{
                maxHeight: maxHeight + 'px'
            }"
            class="mx-auto" />
    </p>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        required: true
    },
    maxWidth: {
        type: Number,
        default: 800
    },
    maxHeight: {
        type: Number,
        default: 600
    },
    alt: {
        type: String,
        default: ''
    }
});
</script>