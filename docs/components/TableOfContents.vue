<template>
    <nav aria-labelledby="on-this-page-title" class="w-56">
        <h2 id="on-this-page-title" class="font-display text-sm font-medium text-slate-900 dark:text-white">On this page</h2>
        <ul class="mt-4 space-y-3 text-sm">
            <li v-for="( section, sectionIndex ) in toc.links"
                :key="'section-'+sectionIndex">
                    <NuxtLink :href="'#'+section.id"
                        :class="{
                            'text-sky-500': isActive( '#'+section.id ),
                            'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300': !isActive( '#'+section.id ),  
                        }">
                        {{ section.text }}
                    </NuxtLink>
                    <ul v-if="section.children" class="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                        <li v-for="( subSection, subSectionIndex ) in section.children"
                            :key="'sub-section-'+subSectionIndex">
                                <NuxtLink :href="'#'+subSection.id"
                                    :class="{
                                        'text-sky-500': isActive( '#'+subSection.id ),
                                        'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300': !isActive( '#'+subSection.id ),  
                                    }">
                                        {{ subSection.text }}
                                </NuxtLink>
                        </li>
                    </ul>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const { toc } = useContent();

const route = useRoute();
const isActive = ( hash ) => {
    return hash == route.hash;
}
</script>