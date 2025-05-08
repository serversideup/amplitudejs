<template>
    <div>
        <iframe class="w-full aspect-video" :src="embedUrl" frameborder="0" allowfullscreen></iframe>
    </div>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        required: true
    }
})

const embedUrl = computed(() => {
    const url = new URL(props.src);
    const params = new URLSearchParams(url.search);
    const videoId = params.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
});
</script>