<template>
    <NuxtLink :href="href" class="group text-inherit no-underline flex items-center hover:text-inherit">
        <div v-if="inView">
            <div class="mt-1 hidden opacity-0 transition group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]">
                <div class="group/anchor block h-5 w-5 -ml-7 rounded-lg ring-1 ring-inset transition bg-zinc-800 ring-zinc-700 hover:bg-zinc-700 hover:ring-zinc-600">
                    <IconsAnchor class="h-5 w-5 transition stroke-zinc-400 group-hover/anchor:stroke-white" />
                </div>
            </div>
        </div>
        <slot/>
    </NuxtLink>
</template>
<script setup>
const props = defineProps({
    href: {
        default: ''
    },
    inView: {
        default: false
    }
});

</script>