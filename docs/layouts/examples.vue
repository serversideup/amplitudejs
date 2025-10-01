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

        <slot></slot>

        <!-- 
        <Search/> -->
    </div>
</template>

<script setup>
// const route = useRoute();
// const { basePath, domain } = useRuntimeConfig().public;
// const { page } = useContent();

// useHead({
//     htmlAttrs: {
//         lang: 'en'
//     },
//     bodyAttrs: {
//         class: 'antialiased font-inter bg-black'
//     }
// })

// useSeoMeta({
//     ogLocale: 'en_US',
//     ogUrl: domain+basePath+route.path,
//     ogType: 'website',
//     ogSiteName: 'Server Side Up - AmplitudeJS',
//     ogTitle: page.value?.head.title,
//     ogDescription: page.value.description,
//     twitterCard: 'summary_large_image',
//     twitterDescription: page.value?.description,
//     twitterSite: '@serversideup',
//     twitterTitle: page.value?.head.title
// })

// defineOgImage({
//     component: 'DocsImage',
//     title: page.value.title,
//     description: page.value.description
// });
</script>