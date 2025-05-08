<template>
    <li class="m-0 px-0 py-4 first:pt-0 last:pb-0">
        <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
            <dt class="sr-only">Name</dt>
            <dd>
                <code v-text="name"></code>
            </dd>
            <dt class="sr-only">Type</dt>
            <dd class="font-mono text-xs text-zinc-500" v-text="type"></dd>
            <dt class="sr-only">Description</dt>
            <dd class="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
                <slot/>
            </dd>
        </dl>
    </li>
</template>

<script setup>
const props = defineProps(['name', 'type']);
</script>