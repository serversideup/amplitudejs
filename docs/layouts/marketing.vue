<template>
    <div class="w-full flex flex-col scroll-smooth bg-[url('images/ui/background-pattern.svg')] bg-[length:410%] md:bg-auto bg-no-repeat min-h-screen bg-[#0C111D]"
        :style="{
            backgroundPosition: 'top, center'
        }">
        <Head>
            <Link rel="preconnect" href="https://fonts.googleapis.com"/>
            <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <Link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
            <link rel="manifest" href="/site.webmanifest">
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
            <meta name="msapplication-TileColor" content="#da532c">
            <meta name="theme-color" content="#ffffff">
        </Head>
        
        <GlobalServerSideUp
            :fixed="true"/>

        <MarketingHeader
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
    title: 'Messaging in Web Extensions made easy. - Server Side Up',
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
    twitterDescription: 'Messaging in Web Extensions made easy. Reduce headache and simplify the effort of keeping data in sync within your browser extension.',
    twitterImage: domain+basePath+'/images/seo/og-image.png',
    twitterSite: '@serversideup',
    twitterTitle: 'Server Side Up - AmplitudeJS'
})

</script>