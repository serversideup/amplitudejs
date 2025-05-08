<template>
    <header
        class="fixed inset-x-0 top-[60px] z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80"
        :class="{
            'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80': !isInsideMobileNavigation,
            'bg-white dark:bg-zinc-900': isInsideMobileNavigation,
            'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]': !isInsideMobileNavigation
        }"
        style="--bg-opacity-light:0.5; --bg-opacity-dark:0.2;">
        
        <div class="absolute inset-x-0 top-full h-px transition"
            :class="{
                'bg-zinc-900/10 dark:bg-white/10' : isInsideMobileNavigation || !mobileNavIsOpen
            }"></div>

            <!-- <DocsSearch/> -->
            
            <div class="flex items-center gap-5 lg:hidden"></div>

            <div class="flex items-center gap-5">
                <nav class="hidden md:block">
                    <ul role="list" class="flex items-center gap-8">
                        <li>
                            <NuxtLink :to="'/'"
                                class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                                    API
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="'/'"
                                class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                                    Documentation
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="'/'"
                                class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                                    Support
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
                <div class="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                <div class="flex gap-4">
                    <!-- <MobileSearch /> -->
                </div>
                <div className="hidden min-[416px]:contents">
                    <AppLink :href="'#'">Sign in</AppLink>
                </div>
            </div>
    </header>
</template>

<script setup>
const props = defineProps({
    isInsideMobileNavigation: {
        default: false
    },
    mobileNavIsOpen: {
        default: false
    }
})
</script>