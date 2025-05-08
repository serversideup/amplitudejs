<template>
    <div v-if="tag != '' || label != ''" class="flex h-9 items-center gap-2 border-y border-t-transparent bg-white/2.5 px-4 border-b-white/5 bg-white/1">
        <div v-if="tag != ''" class="dark flex">
            <DocsTag variant="small">{{ tag }}</DocsTag>
        </div>

        <span v-if="tag != '' && label != ''" class="h-0.5 w-0.5 rounded-full bg-zinc-500" />

        <span v-if="label != ''" class="font-mono text-xs text-zinc-400">{{ label }}</span>
    </div>
</template>

<script setup>
const props = defineProps({
    tag: {
        default: ''
    },
    label: {
        default: ''
    }
})
</script>