<template>
    <NuxtLink
        :to="href"
        class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition"
        :class="[ variantStyles[ variant ] ]">
            <IconsArrow 
                v-if="arrow === 'left'"
                class="mt-0.5 h-5 w-5"
                :class="{
                    'relative top-px': variant === 'text',
                    '-ml-1 rotate-180': arrow === 'left',
                    '-mr-1': arrow === 'right'
                }"/>
            <slot/>
            <IconsArrow 
                v-if="arrow === 'right'"
                class="mt-0.5 h-5 w-5"
                :class="{
                    'relative top-px': variant === 'text',
                    '-ml-1 rotate-180': arrow === 'left',
                    '-mr-1': arrow === 'right'
                }"/>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    variant: {
        default: 'primary'
    },
    arrow: {
        default: ''
    },
    href: {
        default: ''
    }
})

const variantStyles = ref({
    primary: 'rounded-full py-1 px-3 bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 hover:bg-emerald-400/10 hover:text-emerald-300 hover:ring-emerald-300',
    secondary: 'rounded-full py-1 px-3 bg-zinc-800/40 text-zinc-400 ring-1 ring-inset ring-zinc-800 hover:bg-zinc-800 hover:text-zinc-300',
    filled: 'rounded-full py-1 px-3 bg-emerald-500 text-white hover:bg-emerald-400',
    outline: 'rounded-full py-1 px-3 ring-1 ring-inset hover:bg-zinc-900/2.5 hover:text-zinc-900 text-zinc-400 ring-white/10 hover:bg-white/5 hover:text-white',
    text: 'text-link hover:text-link',
})
</script>