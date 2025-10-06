<template>
    <div class="w-full h-screen flex items-start">
        <ExamplesNavigation 
            class="hidden md:block" />
        <div class="prose prose-invert prose-p:text-[#CECFD2] px-4 md:px-0 w-full pt-24 md:w-[calc(100%-256px)] lg:w-[calc(100%-448px)] md:pt-[144px] pb-10 h-screen no-scrollbar overflow-y-auto">
            <ProseH1>Examples</ProseH1>
            <ProseP>Each one of these examples highlights a feature that of AmplitudeJS that you can use in your own projects. All examples are hosted on codepen but are able to be downloaded from GitHub and used in your own projects!</ProseP>
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
    layout: 'examples'
})

defineOgImageComponent('Examples', {
    title: 'Examples',
    description: 'Example AmplitudeJS players',
})
</script>