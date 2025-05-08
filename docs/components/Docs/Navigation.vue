<template>
    <nav>
        <ul role="list">
            <li class="relative my-6">
                <h2 class="text-xs font-semibold text-white">
                    {{ navigation[0].title }}
                </h2>

                <div class="relative mt-3 pl-2">    
                    <div class="absolute inset-y-0 left-2 w-px bg-white/5"></div>

                    <ul role="list" class="border-l border-white/20">
                        <li :class="{
                                'rounded-lg bg-white/5 -ml-4 pl-4': navigation[0]._path === route.path
                            }">
                            <NuxtLink 
                                :to="navigation[0]._path"
                                class="flex justify-between gap-2 pr-3 text-sm transition"
                                :class="{
                                    'text-white': navigation[0]._path === route.path,
                                    'text-zinc-400 hover:text-white': navigation[0]._path != route.path
                                }">
                                    <span class="pl-4 truncate"
                                    :class="{
                                        '-ml-[1px] border-l border-[#155EEF]': navigation[0]._path === route.path
                                    }">{{ navigation[0].title }}</span>   
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </li>

            <DocsNavigationGroup
                v-for="(group, groupIndex) in navigation[0].children"
                :key="'navigation-group-'+groupIndex"
                :group="group"
                :toc="toc"
                :class="{
                    'md:mt-0': groupIndex === 0
                }"
            />

            <li class="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
                <AppLink :href="'#'" :variant="'filled'" class="w-full">
                    Sign in
                </AppLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const route = useRoute();

const { navigation, toc } = useContent();
</script>