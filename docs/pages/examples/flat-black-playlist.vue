<template>
    <div class="w-full h-screen flex items-start">
        <ExamplesNavigation 
            class="hidden md:block" />
        <div class="w-full pt-32 md:w-[calc(100%-256px)] lg:w-[calc(100%-448px)] md:pt-[144px] pb-10 px-8 h-screen no-scrollbar overflow-y-auto">
            <iframe height="780" scrolling="no" title="Flat Black Player" src="//codepen.io/521dimensions/embed/WWQwRw/?height=780&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="allowfullscreen" style="width: 100%;">
            </iframe>
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
    title: 'Flat Black Playlist',
    description: 'A flat black playlist',
})
</script>