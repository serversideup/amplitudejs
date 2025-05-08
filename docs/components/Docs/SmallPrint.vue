<template>
    <div class="flex flex-col items-center justify-between gap-5 border-t pt-8 border-white/5 sm:flex-row">
        <p class="text-xs text-zinc-400">
            &copy; Copyright {{ copyright }}. All rights reserved.
        </p>
        <div class="flex gap-4">
            <NuxtLink :to="'https://twitter.com/serversideup'" class="group">
                <span class="sr-only">Twitter</span>
                <IconsSocialTwitter class="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-500"/>
            </NuxtLink>
            <NuxtLink :to="'https://github.com/serversideup/amplitudejs'" class="group">
                <span class="sr-only">GitHub</span>
                <IconsSocialGitHub class="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-500"/>
            </NuxtLink>
            <NuxtLink :to="'https://serversideup.net/discord'" class="group">
                <span class="sr-only">Discord</span>
                <IconsSocialDiscord class="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-500"/>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const copyright = ref( new Date().getFullYear() );

</script>