<template>
    <div class="w-full">
        <header class="flex items-center justify-between w-full mx-auto px-4 md:px-8 py-3" :class="{ 'fixed top-[43px]': fixed, 'backdrop-blur': bgOpacity }">
            <div class="flex items-center">
                <NuxtLink to="/" class="mr-4">
                    <img src="/images/logos/webext-bridge-horizontal-logo.svg" alt="AmplitudeJS" class="h-8"/>
                </NuxtLink>

                <nav class="items-center space-x-1 hidden lg:flex">
                    <NuxtLink to="/" class="py-2 px-3 font-sans font-semibold text-[#CECFD2] hover:text-white">
                        Home
                    </NuxtLink>
                    <NuxtLink to="/docs" class="py-2 px-3 font-sans font-semibold text-[#CECFD2] hover:text-white">
                        Docs
                    </NuxtLink>
                    <NuxtLink to="https://serversideup.net/discord" target="_blank" class="py-2 px-3 font-sans font-semibold text-[#CECFD2] hover:text-white flex items-center">
                        <DiscordIcon class="mr-3"/>
                        Discord
                    </NuxtLink>
                    <NuxtLink to="https://github.com/serversideup/amplitudejs" target="_blank" class="py-2 px-3 font-sans font-semibold text-[#CECFD2] hover:text-white flex items-center">
                        <GitHubIcon class="mr-3"/>
                        GitHub
                    </NuxtLink>
                    <button @click="promptSearch" class="py-2 px-3 font-sans font-semibold text-[#CECFD2] hover:text-white flex items-center">
                        <SearchIcon class="mr-3"/>
                        Search
                    </button>
                </nav>
            </div>

            <div class="items-center space-x-4 hidden lg:flex">
                <NuxtLink to="https://github.com/serversideup/amplitudejs" target="_blank" class="py-3 px-5 font-sans font-semibold text-[#94969C] hover:text-white flex items-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                        <path d="M9.4022 2.87774C9.59427 2.48863 9.69031 2.29407 9.82068 2.23191C9.93411 2.17782 10.0659 2.17782 10.1793 2.23191C10.3097 2.29407 10.4057 2.48863 10.5978 2.87774L12.42 6.56938C12.4767 6.68426 12.5051 6.7417 12.5465 6.78629C12.5832 6.82578 12.6272 6.85777 12.6761 6.8805C12.7313 6.90617 12.7947 6.91543 12.9214 6.93396L16.9975 7.52973C17.4267 7.59247 17.6413 7.62384 17.7406 7.72868C17.8271 7.81989 17.8677 7.94523 17.8512 8.06979C17.8323 8.21296 17.677 8.3643 17.3662 8.66696L14.4179 11.5387C14.326 11.6282 14.28 11.6729 14.2503 11.7262C14.2241 11.7734 14.2072 11.8252 14.2008 11.8787C14.1934 11.9392 14.2043 12.0025 14.2259 12.1289L14.9216 16.1851C14.995 16.6129 15.0317 16.8268 14.9627 16.9537C14.9028 17.0642 14.7961 17.1416 14.6725 17.1645C14.5305 17.1909 14.3384 17.0899 13.9542 16.8878L10.3103 14.9715C10.1968 14.9118 10.14 14.8819 10.0802 14.8702C10.0272 14.8598 9.97277 14.8598 9.91982 14.8702C9.86001 14.8819 9.80324 14.9118 9.6897 14.9715L6.04576 16.8878C5.66159 17.0899 5.4695 17.1909 5.32747 17.1645C5.20389 17.1416 5.09726 17.0642 5.03727 16.9537C4.96832 16.8268 5.00501 16.6129 5.07839 16.1851L5.77406 12.1289C5.79575 12.0025 5.80659 11.9392 5.79926 11.8787C5.79276 11.8252 5.77592 11.7734 5.74966 11.7262C5.72001 11.6729 5.67405 11.6282 5.58214 11.5387L2.63379 8.66696C2.32304 8.3643 2.16767 8.21296 2.14876 8.06979C2.13231 7.94523 2.17295 7.81989 2.25937 7.72868C2.35869 7.62384 2.5733 7.59247 3.00253 7.52973L7.07858 6.93396C7.20534 6.91543 7.26872 6.90617 7.32392 6.8805C7.37279 6.85777 7.41679 6.82578 7.45348 6.78629C7.49491 6.7417 7.52326 6.68426 7.57997 6.56938L9.4022 2.87774Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    Star on GitHub
                </NuxtLink>
                
                <NuxtLink to="/docs" class="py-3 px-5 font-sans font-semibold text-white bg-[#155EEF] rounded-lg flex items-center">
                    Get Started 

                    <svg class="ml-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.16669 9.99999H15.8334M15.8334 9.99999L10 4.16666M15.8334 9.99999L10 15.8333" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </NuxtLink>
            </div>

            <button class="p-2 flex items-center justify-center lg:hidden" @click="toggleMobileNav()">
                <svg v-show="!showMobileMenu" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H19M1 1H19M1 13H19" stroke="#CECFD2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-show="showMobileMenu" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L1 13M1 1L13 13" stroke="#CECFD2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </header>

    <GlobalMobileMenu
        :show="showMobileMenu"
        :navigation="navigation[0]"/>
    </div>
</template>

<script setup>
const props = defineProps({ 
    fixed: {
        default: false
    }
});

const showMobileMenu = ref(false);
const toggleMobileNav = () => {
    showMobileMenu.value = showMobileMenu.value ? false : true;
}
watch(showMobileMenu, ( newValue ) => {
    if( newValue ){
        document.documentElement.classList.add('overflow-y-hidden');
        document.body.classList.add('overflow-y-hidden');
    }else{
        document.documentElement.classList.remove('overflow-y-hidden');
        document.body.classList.remove('overflow-y-hidden');
    }
});

const { navigation } = useContent();

const docsEventBus = useEventBus('amplitudejs-docs-event-bus');
const promptSearch = () => {
    docsEventBus.emit('prompt-search');
}

docsEventBus.on(( event ) => {
    if( event === 'hide-mobile-menu' ){
        showMobileMenu.value = false;
    }
});

const bgOpacity = ref(false);
onMounted(() => {
    window.onscroll = () => {
        if( window.scrollY > 10 ){
            bgOpacity.value = true;
        }else{
            bgOpacity.value = false;
        }
    }
});
</script>