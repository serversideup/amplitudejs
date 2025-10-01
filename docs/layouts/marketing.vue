<template>
    <div class="w-full flex flex-col scroll-smooth antialiased md:bg-auto bg-no-repeat min-h-screen bg-[#0C0E12]">
        <Head>
            <Link rel="preconnect" href="https://fonts.googleapis.com"/>
            <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <Link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
            <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
        
        <ServerSideUp
            :fixed="true"/>

        <AppHeader
            :fixed="true"/>
            
        <div class="w-full flex flex-col">
            <slot></slot>
        </div>

        <!-- <Search/> -->
    </div>
</template>

<script setup>
useHead({
    htmlAttrs: {
        lang: 'en'
    },
    bodyAttrs: {
        class: 'antialiased'
    },
    title: 'AmplitudeJS - Server Side Up',
    script: [
        {
            src: 'https://f.convertkit.com/ckjs/ck.5.js'
        }
    ]
})

const route = useRoute();
const { basePath, domain } = useRuntimeConfig().public;

useSeoMeta({
    ogLocale: 'en_US',
    ogUrl: domain+basePath+route.path,
    ogType: 'website',
    ogSiteName: 'Server Side Up - AmplitudeJS',
    ogImage: domain+basePath+'/images/seo/og-image.png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogDescription: '',
    ogTitle: 'Server Side Up - AmplitudeJS',
    twitterCard: 'summary_large_image',
    twitterDescription: 'Design your web audio player, the way you want.',
    twitterImage: domain+basePath+'/images/seo/og-image.png',
    twitterSite: '@serversideup',
    twitterTitle: 'Server Side Up - AmplitudeJS'
})

</script>