<style scoped>
.slide-in-right-enter-active {
	-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-in-right-leave-active {
	-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
	        animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both reverse;
}

@-webkit-keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
</style>

<template>
    <transition name="slide-in-right">
        <div class="fixed top-0 left-0 bottom-0 w-full h-full overflow-y-auto bg-black z-[999999999]" v-show="isOpen">
            <div class="flex items-center justify-between pt-8 px-4">
                <NuxtLink to="/" aria-label="Home">
                    <img src="/images/logos/amplitudejs.svg" alt="logo" class="h-6"/>
                </NuxtLink>

                <button @click="toggleMenu()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M13 1L1 13M1 1L13 13" stroke="#F7F7F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>

            <nav class="flex flex-col px-4 pt-8">
                <NuxtLink 
                    to="/docs" 
                    @click.native="toggleMenu()" 
                    class="flex items-center font-inter font-bold text-slate-300 text-xl mb-6">
                        <div class="flex items-center justify-center w-5 h-5 mr-2">
                            <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-h-full">
                                <path d="M17 18.4468V15.4468H4C2.34315 15.4468 1 16.79 1 18.4468M5.8 21.4468H13.8C14.9201 21.4468 15.4802 21.4468 15.908 21.2289C16.2843 21.0371 16.5903 20.7311 16.782 20.3548C17 19.927 17 19.3669 17 18.2468V4.64684C17 3.52673 17 2.96668 16.782 2.53886C16.5903 2.16253 16.2843 1.85657 15.908 1.66483C15.4802 1.44684 14.9201 1.44684 13.8 1.44684H5.8C4.11984 1.44684 3.27976 1.44684 2.63803 1.77382C2.07354 2.06144 1.6146 2.52038 1.32698 3.08487C1 3.7266 1 4.56668 1 6.24684V16.6468C1 18.327 1 19.1671 1.32698 19.8088C1.6146 20.3733 2.07354 20.8322 2.63803 21.1199C3.27976 21.4468 4.11984 21.4468 5.8 21.4468Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        
                        Docs
                </NuxtLink>

                <NuxtLink 
                    to="/examples" 
                    @click.native="toggleMenu()" 
                    class="flex items-center font-inter font-bold text-slate-300 text-xl mb-6">
                        <div class="flex items-center justify-center w-5 h-5 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M7.85547 16V4.3554C7.85547 3.87387 7.85547 3.6331 7.94307 3.43782C8.02029 3.26569 8.14463 3.11891 8.30173 3.01444C8.47995 2.89592 8.71745 2.85634 9.19243 2.77717L17.9924 1.31051C18.6334 1.20368 18.9539 1.15027 19.2037 1.24304C19.4228 1.32445 19.6066 1.48009 19.7229 1.6829C19.8555 1.91402 19.8555 2.23893 19.8555 2.88874V14M7.85547 16C7.85547 17.6569 6.51232 19 4.85547 19C3.19861 19 1.85547 17.6569 1.85547 16C1.85547 14.3431 3.19861 13 4.85547 13C6.51232 13 7.85547 14.3431 7.85547 16ZM19.8555 14C19.8555 15.6569 18.5123 17 16.8555 17C15.1986 17 13.8555 15.6569 13.8555 14C13.8555 12.3431 15.1986 11 16.8555 11C18.5123 11 19.8555 12.3431 19.8555 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        
                        Examples
                </NuxtLink>

                <NuxtLink 
                    to="https://serversideup.net/discord/" 
                    target="_blank" 
                    @click.native="toggleMenu()" 
                    class="flex items-center font-inter font-bold text-slate-300 text-xl mb-6">
                        <div class="flex items-center justify-center w-5 h-5 mr-2">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.6361 5.39641C18.1907 4.73466 16.6648 4.26519 15.0973 4C14.8828 4.38343 14.6888 4.77793 14.5159 5.18184C12.8463 4.93025 11.1484 4.93025 9.47881 5.18184C9.30587 4.77797 9.1118 4.38348 8.8974 4C7.32897 4.26743 5.80205 4.73801 4.35518 5.39987C1.48276 9.64967 0.70409 13.7939 1.09342 17.8793C2.77558 19.1222 4.6584 20.0674 6.66003 20.6739C7.11074 20.0677 7.50956 19.4246 7.85226 18.7514C7.20135 18.5083 6.57311 18.2084 5.9748 17.8551C6.13227 17.7409 6.28627 17.6232 6.43508 17.509C8.17601 18.3277 10.0761 18.7522 12 18.7522C13.9238 18.7522 15.8239 18.3277 17.5648 17.509C17.7154 17.6319 17.8694 17.7495 18.0251 17.8551C17.4257 18.209 16.7963 18.5095 16.1442 18.7532C16.4865 19.426 16.8853 20.0686 17.3364 20.6739C19.3398 20.0698 21.224 19.1251 22.9065 17.881C23.3633 13.1433 22.1261 9.03711 19.6361 5.39641ZM8.34541 15.3668C7.26047 15.3668 6.36414 14.3822 6.36414 13.171C6.36414 11.9597 7.22932 10.9665 8.34195 10.9665C9.45458 10.9665 10.344 11.9597 10.325 13.171C10.3059 14.3822 9.45112 15.3668 8.34541 15.3668ZM15.6545 15.3668C14.5678 15.3668 13.675 14.3822 13.675 13.171C13.675 11.9597 14.5401 10.9665 15.6545 10.9665C16.7689 10.9665 17.6514 11.9597 17.6323 13.171C17.6133 14.3822 16.7602 15.3668 15.6545 15.3668Z" fill="#E2E8F0"/>
                            </svg>
                        </div>
                        
                        Discord
                </NuxtLink>

                <button 
                    @click="promptSearch()"
                    @click.native="toggleMenu()" 
                    class="flex items-center font-inter font-bold text-slate-300 text-xl mb-6">
                        <div class="flex items-center justify-center w-5 h-5 mr-2">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-h-full">
                                <path d="M19 19.4468L13.0001 13.4468M15 8.44684C15 12.3128 11.866 15.4468 8 15.4468C4.13401 15.4468 1 12.3128 1 8.44684C1 4.58084 4.13401 1.44684 8 1.44684C11.866 1.44684 15 4.58084 15 8.44684Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>

                        Search
                </button>

                <div class="mb-6">
                    <NuxtLink to="https://github.com/serversideup/amplitudejs" target="_blank" class="inline-flex py-2.5 px-4 font-sans font-semibold text-[#CECFD2] hover:text-white items-center border border-[#373A41] rounded-lg transition-colors duration-200 hover:bg-[#22262F]">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                            <path d="M8.40217 1.87775C8.59424 1.48863 8.69028 1.29408 8.82065 1.23192C8.93408 1.17783 9.06587 1.17783 9.1793 1.23192C9.30967 1.29408 9.40571 1.48863 9.59778 1.87775L11.42 5.56939C11.4767 5.68427 11.5051 5.7417 11.5465 5.7863C11.5832 5.82579 11.6272 5.85778 11.6761 5.8805C11.7313 5.90617 11.7946 5.91544 11.9214 5.93397L15.9975 6.52974C16.4267 6.59248 16.6413 6.62385 16.7406 6.72868C16.827 6.8199 16.8677 6.94523 16.8512 7.0698C16.8323 7.21297 16.6769 7.3643 16.3662 7.66697L13.4178 10.5387C13.3259 10.6282 13.28 10.6729 13.2503 10.7262C13.2241 10.7734 13.2072 10.8252 13.2007 10.8787C13.1934 10.9393 13.2042 11.0025 13.2259 11.1289L13.9216 15.1851C13.995 15.6129 14.0317 15.8268 13.9627 15.9537C13.9027 16.0642 13.7961 16.1416 13.6725 16.1645C13.5305 16.1909 13.3384 16.0899 12.9542 15.8878L9.31027 13.9715C9.19674 13.9118 9.13997 13.882 9.08016 13.8702C9.02721 13.8598 8.97274 13.8598 8.91979 13.8702C8.85998 13.882 8.80321 13.9118 8.68967 13.9715L5.04573 15.8878C4.66156 16.0899 4.46947 16.1909 4.32744 16.1645C4.20386 16.1416 4.09723 16.0642 4.03724 15.9537C3.96829 15.8268 4.00498 15.6129 4.07835 15.1851L4.77403 11.1289C4.79572 11.0025 4.80656 10.9393 4.79923 10.8787C4.79273 10.8252 4.77589 10.7734 4.74963 10.7262C4.71998 10.6729 4.67402 10.6282 4.58211 10.5387L1.63376 7.66697C1.32301 7.3643 1.16764 7.21297 1.14873 7.0698C1.13228 6.94523 1.17292 6.8199 1.25933 6.72868C1.35866 6.62385 1.57327 6.59248 2.0025 6.52974L6.07855 5.93397C6.20531 5.91544 6.26869 5.90617 6.32389 5.8805C6.37276 5.85778 6.41676 5.82579 6.45345 5.7863C6.49488 5.7417 6.52323 5.68427 6.57994 5.56939L8.40217 1.87775Z" stroke="#61656C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Star on GitHub
                    </NuxtLink>
                </div>

                <div>
                    <NuxtLink to="/docs" class="inline-flex bg-[#155EEF] py-2.5 px-4 font-sans font-semibold text-white items-center border-2 border-[rgba(255,255,255,0.12)] rounded-lg hover:bg-[#004EEB] transition-colors duration-200">
                        Get Started
                    </NuxtLink>
                </div>
            </nav>

            <nav class="px-4 pt-8">
                <ul role="list">
                    <li v-for="navigationGroup in navigation[0].children" :key="navigationGroup.title" class="my-6">
                        <span class="text-white font-semibold">{{ navigationGroup.group ? navigationGroup.group : navigationGroup.title }}</span>
                        <ul role="list" class="mt-2 pl-2" v-if="navigationGroup.children">
                            <li v-for="link in navigationGroup.children" :key="link.title">
                                <NuxtLink 
                                    @click.native="toggleMenu()" 
                                    :to="link.path" 
                                    class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                                    :class="{
                                        'text-white border-l-[#155EEF] font-semibold': link.path === route.path,
                                        'text-zinc-400 hover:text-white': link.path != route.path
                                    }">
                                    {{ link.title }}
                                </NuxtLink>
                            </li>
                        </ul>
                        <ul role="list" class="mt-2 pl-2" v-else>
                            <li>
                                <NuxtLink 
                                    @click.native="toggleMenu()" 
                                    :to="'/docs'" 
                                    class="flex justify-between gap-2 pr-3 pl-2 border-l border-white/20 py-1 text-sm transition"
                                    :class="{
                                        'text-white border-l-[#155EEF] font-semibold': '/docs' === route.path,
                                        'text-zinc-400 hover:text-white': '/docs' != route.path
                                    }">
                                    Overview
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
});

const { 
    discord
} = useAppConfig()

const emit = defineEmits(['toggle-menu'])
const toggleMenu = () => {
    emit('toggle-menu')
}

const docsEventBus = useEventBus('amplitudejs-docs-event-bus');

const promptSearch = () => {
    docsEventBus.emit('prompt-search');
}

const route = useRoute();

const { data: navigation } = await useAsyncData('mobile-navigation', () => {
    return queryCollectionNavigation('docs', ["group"])
})
</script>