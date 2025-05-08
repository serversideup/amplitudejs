<template>
    <div class="my-6 flex gap-2.5 rounded-2xl border p-4 leading-6 border-rose-500/30 bg-rose-500/5 text-rose-200 [--tw-prose-links:theme(colors.white)] [--tw-prose-links-hover:theme(colors.rose.300)]">
        <InfoIcon class="mt-1 h-4 w-4 flex-none fill-rose-200/20 stroke-rose-200" />
        <div class="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
            <slot/>
        </div>
    </div>
</template>