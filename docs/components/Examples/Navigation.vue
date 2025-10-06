<template>
    <nav class="overflow-y-auto h-screen pt-[131px] no-scrollbar md:w-64 px-6">
        <ul role="list">
            <li class="my-6">
                <span class="text-white font-semibold">Examples</span>
                <ul role="list" class="mt-2 pl-2">
                    <li>
                        <NuxtLink 
                            :to="'/examples'" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/examples' === route.path,
                                'text-zinc-400 hover:text-white': '/examples' != route.path
                            }">
                            Examples
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink 
                            :to="'/examples/blue-playlist'" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/examples/blue-playlist' === route.path,
                                'text-zinc-400 hover:text-white': '/examples/blue-playlist' != route.path
                            }">
                            Blue Playlist
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink 
                            :to="'/examples/flat-black-playlist'" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/examples/flat-black-playlist' === route.path,
                                'text-zinc-400 hover:text-white': '/examples/flat-black-playlist' != route.path
                            }">
                            Flat Black Playlist
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink 
                            :to="'/examples/single-song-player'" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/examples/single-song-player' === route.path,
                                'text-zinc-400 hover:text-white': '/examples/single-song-player' != route.path
                            }">
                            Single Song Player
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink 
                            :to="'/examples/visualization-player'" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/examples/visualization-player' === route.path,
                                'text-zinc-400 hover:text-white': '/examples/visualization-player' != route.path
                            }">
                            Visualization Player
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink 
                            :to="'/examples/dynamic-playlist-player'" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/examples/dynamic-playlist-player' === route.path,
                                'text-zinc-400 hover:text-white': '/examples/dynamic-playlist-player' != route.path
                            }">
                            Dynamic Playlist Player
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink 
                            :to="'/examples/multiple-songs'" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/examples/multiple-songs' === route.path,
                                'text-zinc-400 hover:text-white': '/examples/multiple-songs' != route.path
                            }">
                            Multiple Songs
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink 
                            :to="'/examples/multiple-playlists'" 
                            class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                            :class="{
                                'text-white border-l-[#155EEF] font-semibold': '/examples/multiple-playlists' === route.path,
                                'text-zinc-400 hover:text-white': '/examples/multiple-playlists' != route.path
                            }">
                            Multiple Playlists
                        </NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const route = useRoute();
</script>