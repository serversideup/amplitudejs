<template>
    <div class="py-[2px] px-[6px] rounded-md font-medium text-xs text-[#CECFD2] font-sans inline-flex items-center border border-[#373A41] transition-colors duration-300" :class="{ 'hover:border-[#61656C] hover:text-white': !disableHover, 'border-[#61656C] text-white': active }">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" class="mr-1">
            <circle cx="4.00001" cy="4" r="3" :fill="color"/>
        </svg>

        {{ label }}
    </div>
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
    disableHover: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    }
})
</script>