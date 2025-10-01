<template>
    <div class="w-full h-screen flex items-start">
        <ExamplesNavigation 
            class="hidden md:block" />
        <div class="w-full pt-32 md:w-[calc(100%-256px)] md:pt-[144px] pb-10 px-8 h-screen no-scrollbar overflow-y-auto">
            <iframe height="780" scrolling="no" title="Multiple Songs" src="//codepen.io/521dimensions/embed/QPjNYv/?height=780&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="allowfullscreen" style="width: 100%;">
            </iframe>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'examples'
})
</script>