<template>
    <div class="w-full h-screen flex items-start">
        <DocsNavigation 
            :navigation="navigation" />
        <div class="w-[calc(100%-384px)]">
            <ContentRenderer 
                :value="page"
                class="h-screen max-w-screen-lg mx-auto pt-[131px] no-scrollbar overflow-y-auto prose md:prose-lg prose-invert prose-p:font-normal prose-p:text-[#CECFD2] px-4 md:px-6" />
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
</script>