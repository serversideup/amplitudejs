<template>
<dl class="mt-12 flex justify-between border-t border-slate-200 pt-6 w-full dark:border-slate-800">
    <div v-if="prev">
        <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">
            Previous
        </dt>
        <dd class="mt-1">
            <NuxtLink :href="prev._path">
                <a class="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                    &larr; {{ prev.title }}
                </a>
            </NuxtLink>
        </dd>
    </div>
    <div v-if="next">
        <div class="ml-auto text-right">
            <dt class="font-display text-sm font-medium text-slate-900 dark:text-white">
                Next
            </dt>
            <dd class="mt-1">
                <NuxtLink :href="next._path">
                    <a class="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                        {{ next.title }} &rarr;
                    </a>
                </NuxtLink>
            </dd>
        </div>
    </div>
</dl>
</template>

<script setup>
const { next, prev } = useContent();
</script>
