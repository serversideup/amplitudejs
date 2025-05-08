<template>
    <div class="not-prose max-w-[40rem] mx-auto lg:ml-[calc(50%_-_min(50%,33rem))] lg:mr-[calc(50%_-_min(50%,33rem))] lg:max-w-[50rem] my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md ring-1 ring-white/10">
        <div class="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b px-4 border-zinc-800 bg-transparent">
            <h3 v-if="label != ''" class="mr-auto pt-3 text-xs font-semibold text-white">
                {{ label }}
            </h3>
        </div>

        <div class="group bg-white/2.5">
            <div class="relative overflow-x-auto p-4 text-xs text-white">
                <ContentSlot :use="$slots.default"/>
                <CopyButton :code="$slots.default()[0].props.code"/>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    code: {
        return: ''
    },
    tag: {
        return: ''
    },
    label: {
        return: ''
    }
})
</script>