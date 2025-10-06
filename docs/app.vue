<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
useHead({
    script: [
        {
            src: 'https://f.convertkit.com/ckjs/ck.5.js',
            async: true,
            defer: true
        },
        {
            src: 'https://cdn.jsdelivr.net/npm/amplitudejs@latest/dist/amplitude.min.js'
        }
    ]
})
</script>
  