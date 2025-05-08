<template>
    <span class="font-mono text-[0.625rem] font-semibold leading-6"
        :class="[ variantStyles[ variant ], colorStyles[ color ][ variant ] ]">
        <slot/>
    </span>
</template>

<script setup>
const props = defineProps({
    variant: {
        default: 'medium'
    },
    color: {
        default: 'emerald'
    }
});

const variantStyles = ref({
    medium: 'rounded-lg px-1.5 ring-1 ring-inset'
})

const colorStyles = ref({
    emerald: {
        small: 'text-emerald-400',
        medium: 'ring-emerald-400/30 bg-emerald-400/10 text-emerald-500 text-emerald-400',
    },

    sky: {
        small: 'text-sky-500',
        medium: 'ring-sky-400/30 bg-sky-400/10 text-sky-400',
    },

    amber: {
        small: 'text-amber-500',
        medium: 'ring-amber-400/30 bg-amber-400/10 text-amber-400',
    },

    rose: {
        small: 'text-red-500 text-rose-500',
        medium: 'ring-rose-500/20 bg-rose-400/10 text-rose-400',
    },

    zinc: {
        small: 'text-zinc-400 text-zinc-500',
        medium: 'ring-zinc-500/20 bg-zinc-400/10 text-zinc-400',
    },
})

const valueColorMap = ref({
    get: 'emerald',
    post: 'sky',
    put: 'amber',
    delete: 'rose',
})
</script>