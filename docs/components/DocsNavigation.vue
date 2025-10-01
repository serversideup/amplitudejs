<template>
    <nav class="text-base w-64 pr-8 lg:text-sm xl:w-72 xl:pr-16">
        <ul class="space-y-9">
            <ContentNavigation v-slot="{ navigation }">
                <li v-for="( section, sectionIndex ) in navigation"
                    :key="'section-'+sectionIndex">
                    <h2 class="font-display font-medium text-slate-900 dark:text-white">
                        {{ section.title }}
                    </h2>
                    <ul class="mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:dark:border-slate-800 lg:border-slate-200">
                        <li v-for="( child, childIndex ) in section.children"
                            :key="'section-'+sectionIndex+'-child-'+childIndex"
                            class="relative">
                            <NuxtLink :to="child._path">
                                <span class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full"
                                    :class="{
                                        'font-semibold text-sky-500 before:bg-sky-500': route.path == child._path,
                                        'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300': route.path != child._path
                                    }">
                                        {{ child.title }}
                                    </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </li>
            </ContentNavigation>
        </ul>
    </nav>
</template>

<script setup>
const route = useRoute();
</script>