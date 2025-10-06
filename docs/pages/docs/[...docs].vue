<template>
    <div class="w-full h-screen flex items-start">
        <DocsNavigation 
            :navigation="navigation"
            class="hidden md:block" />
        <div class="w-full pt-24 md:w-[calc(100%-256px)] lg:w-[calc(100%-448px)] md:pt-[144px] pb-10 h-screen no-scrollbar overflow-y-auto">
            <ContentRenderer 
                :value="page"
                class="max-w-screen-md prose prose-invert prose-p:mb-6 prose-p:font-normal prose-p:text-[#CECFD2] px-4 md:px-6" />
            
            <div class="flex items-center justify-between px-4 gap-x-4 md:px-6">
                <div class="flex flex-col items-start">
                    <NuxtLink v-if="surround[0]" :to="surround[0].path" class="text-base font-semibold transition text-white hover:text-zinc-300">
                        &larr; {{ surround[0].title }}
                    </NuxtLink>
                </div>
                <div class="flex flex-col items-end">
                    <NuxtLink v-if="surround[1]" :to="surround[1].path" class="text-base font-semibold transition text-white hover:text-zinc-300">
                        {{ surround[1].title }} &rarr;
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="hidden md:flex flex-col pt-36 w-48 px-5">
            <p class="text-white font-sans text-base font-semibold mb-2">Sponsors</p>
            <NuxtLink to="https://soothingrelaxation.com/" target="_blank">
                <img src="/images/logos/soothing-relaxation.png" alt="Soothing Relaxation" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'docs'
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

const { data: navigation } = await useAsyncData('navigation', () => {
    return queryCollectionNavigation('docs', ["group"])
})

const { data: surround } = await useAsyncData('surround-' + route.path, () => {
    return queryCollectionItemSurroundings('docs', route.path);
})

defineOgImageComponent('Docs', {
    title: page.value.title,
    description: page.value.description,
})
</script>