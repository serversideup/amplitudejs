<template>
    <div class="w-full h-screen flex items-start">
        <ExamplesNavigation 
            class="hidden md:block" />
        <div class="w-full pt-24 md:w-[calc(100%-256px)] lg:w-[calc(100%-384px)] md:pt-[144px] pb-10 h-screen no-scrollbar overflow-y-auto">
            
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'examples'
})
</script>