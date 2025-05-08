<template>
    <div class="flex items-center gap-x-3" v-if="tag != null && label != null">
        <DocsTag>{{ tag }}</DocsTag>
        <span class="h-0.5 w-0.5 rounded-full bg-zinc-600"></span>
        <span class="font-mono text-xs text-zinc-400">{{ label }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    tag: {
        default: null
    },
    label: {
        default: null
    }
})
</script>