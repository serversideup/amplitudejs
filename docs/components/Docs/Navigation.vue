<template>
    <nav class="overflow-y-auto h-screen pt-[131px] no-scrollbar md:w-64 px-6">
        <ul role="list">
            <li v-for="navigationGroup in navigation[0].children" :key="navigationGroup.title" class="my-6">
                <span class="text-white font-semibold">{{ navigationGroup.group ? navigationGroup.group : navigationGroup.title }}</span>
                <ul role="list" class="mt-2 pl-2" v-if="navigationGroup.children">
                    <li v-for="link in navigationGroup.children" :key="link.title">
                        <NuxtLink 
                            :to="link.path" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': link.path === route.path,
                                'text-zinc-400 hover:text-white': link.path != route.path
                            }">
                            {{ link.title }}
                        </NuxtLink>
                    </li>
                </ul>
                <ul role="list" class="mt-2 pl-2" v-else>
                    <li>
                        <NuxtLink :to="'/docs'" class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/docs' === route.path,
                                'text-zinc-400 hover:text-white': '/docs' != route.path
                            }">
                            Overview
                        </NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const props = defineProps(['navigation']);
const route = useRoute();
</script>