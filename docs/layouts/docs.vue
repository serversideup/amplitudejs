<template>
    <div class="w-full flex flex-col scroll-smooth antialiased md:bg-auto bg-no-repeat min-h-screen bg-[#0C0E12]">

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

        <ServerSideUp
            :fixed="true"/>

        <AppHeader
            :fixed="true"/>

        <slot></slot>

        <!-- <div class="lg:flex lg:w-screen lg:h-[calc(100vh-126px)]">
            <div style="scrollbar-width: none" class="contents lg:overflow-y-scroll lg:pointer-events-none lg:z-40 lg:flex lg:top-[126px]">
                <div class="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:px-6 lg:pt-4 lg:pb-8 lg:border-white/10 xl:w-80">
                    <DocsNavigation
                        class="hidden lg:block"/>
                </div>
            </div>

            <div class="relative px-4 pt-5 sm:px-6 lg:overflow-y-scroll lg:flex-1 lg:px-8">
                <main class="py-8 scroll-smooth" id="content-container">
                    <ContentDoc
                        class="prose prose-invert" 
                        tag="article" />
                </main>

                <DocsFooter/>
            </div>
        </div>

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