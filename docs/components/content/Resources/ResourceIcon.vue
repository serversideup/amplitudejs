<template>
    <div class="flex h-7 w-7 items-center justify-center rounded-full ring-1 backdrop-blur-[2px] transition duration-300 bg-white/7.5 ring-white/15 group-hover:bg-emerald-300/10 group-hover:ring-emerald-400">
        <IconsUserIcon v-if="icon == 'icons-user'" class="h-5 w-5 transition-colors duration-300 fill-white/10 stroke-zinc-400 group-hover:fill-emerald-300/10 group-hover:stroke-emerald-400" />
        <IconsChatBubbleIcon v-if="icon == 'icons-chat-bubble'" class="h-5 w-5 transition-colors duration-300 fill-white/10 stroke-zinc-400 group-hover:fill-emerald-300/10 group-hover:stroke-emerald-400"/>
        <IconsEnvelopeIcon v-if="icon == 'icons-envelope'" class="h-5 w-5 transition-colors duration-300 fill-white/10 stroke-zinc-400 group-hover:fill-emerald-300/10 group-hover:stroke-emerald-400"/>
        <IconsUsersIcon v-if="icon == 'icons-users'" class="h-5 w-5 transition-colors duration-300 fill-white/10 stroke-zinc-400 group-hover:fill-emerald-300/10 group-hover:stroke-emerald-400"/>
    </div>
</template>

<script setup>
const props = defineProps(['icon']);
</script>