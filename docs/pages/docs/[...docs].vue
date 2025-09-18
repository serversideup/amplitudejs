<template>
    <div class="w-full h-screen flex items-start">
        <DocsNavigation 
            :navigation="navigation" />
        <div class="w-[calc(100%-384px)] pt-[144px] pb-10 h-screen no-scrollbar overflow-y-auto">
            <ContentRenderer 
                :value="page"
                class="max-w-screen-lg mx-auto prose prose-invert md:prose-lg prose-p:font-normal prose-p:text-[#CECFD2] px-4 md:px-6" />
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