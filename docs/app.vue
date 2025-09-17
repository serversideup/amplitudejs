<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
provideHeadlessUseId(() => useId())
useHead({
    script: [
        {
            src: 'https://f.convertkit.com/ckjs/ck.5.js',
            async: true,
            defer: true
        }
    ]
})
</script>
  