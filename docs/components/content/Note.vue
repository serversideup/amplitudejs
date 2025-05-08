<template>
    <div class="my-6 flex gap-2.5 rounded-2xl border p-4 leading-6 border-emerald-500/30 bg-emerald-500/5 text-emerald-200 [--tw-prose-links:theme(colors.white)] [--tw-prose-links-hover:theme(colors.emerald.300)]">
        <InfoIcon class="mt-1 h-4 w-4 flex-none fill-emerald-200/20 stroke-emerald-200" />
        <div class="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
            <slot/>
        </div>
    </div>
</template>