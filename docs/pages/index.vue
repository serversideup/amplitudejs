<template>
    <div class="w-full flex flex-col mt-[130px] bg-[#0C0E12]">
        <HomeHero/>
        <HomeFeatures/>
        <HomeFeaturedIn/>
        <HomeEvenMore/>
        <HomeCommunity/>
        <HomeNewsletter/>
        <HomeFooter/>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'marketing'
})

defineOgImageComponent('Home', {
    title: 'AmplitudeJS',
    description: 'A JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies',
})
</script>