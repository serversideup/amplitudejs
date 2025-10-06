<template>
    <footer class="bg-[#0C0E12] w-full flex flex-col items-center justify-center pt-8 md:pt-16">
        <div class="max-w-screen-xl w-full px-8 flex flex-col items-center justify-center border-b border-[#22262F] pb-16">
            <img src="/images/logos/amplitudejs.svg" alt="AmplitudeJS" class="h-8 mb-8 md:mb-12"/>

            <div class="flex flex-col items-center justify-center mx-auto max-w-screen-md">
                <p class="text-center font-sans text-[#F7F7F7] font-semibold text-2xl md:text-3xl">Take control of your audio experience.</p>
                <p class="mt-4 text-center font-sans text-[#94979C] text-base md:text-xl">Free and Open Source on GitHub.</p>

                <div class="flex flex-col md:flex-row items-center justify-center mt-8 md:mt-12">
                    <NuxtLink to="https://github.com/serversideup/amplitudejs" target="_blank" class="py-3 px-5 font-sans font-semibold text-[#CECFD2] hover:text-white flex items-center border border-[#373A41] rounded-lg hover:bg-[#22262F] transition-colors duration-200">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                            <path d="M8.40217 1.87775C8.59424 1.48863 8.69028 1.29408 8.82065 1.23192C8.93408 1.17783 9.06587 1.17783 9.1793 1.23192C9.30967 1.29408 9.40571 1.48863 9.59778 1.87775L11.42 5.56939C11.4767 5.68427 11.5051 5.7417 11.5465 5.7863C11.5832 5.82579 11.6272 5.85778 11.6761 5.8805C11.7313 5.90617 11.7946 5.91544 11.9214 5.93397L15.9975 6.52974C16.4267 6.59248 16.6413 6.62385 16.7406 6.72868C16.827 6.8199 16.8677 6.94523 16.8512 7.0698C16.8323 7.21297 16.6769 7.3643 16.3662 7.66697L13.4178 10.5387C13.3259 10.6282 13.28 10.6729 13.2503 10.7262C13.2241 10.7734 13.2072 10.8252 13.2007 10.8787C13.1934 10.9393 13.2042 11.0025 13.2259 11.1289L13.9216 15.1851C13.995 15.6129 14.0317 15.8268 13.9627 15.9537C13.9027 16.0642 13.7961 16.1416 13.6725 16.1645C13.5305 16.1909 13.3384 16.0899 12.9542 15.8878L9.31027 13.9715C9.19674 13.9118 9.13997 13.882 9.08016 13.8702C9.02721 13.8598 8.97274 13.8598 8.91979 13.8702C8.85998 13.882 8.80321 13.9118 8.68967 13.9715L5.04573 15.8878C4.66156 16.0899 4.46947 16.1909 4.32744 16.1645C4.20386 16.1416 4.09723 16.0642 4.03724 15.9537C3.96829 15.8268 4.00498 15.6129 4.07835 15.1851L4.77403 11.1289C4.79572 11.0025 4.80656 10.9393 4.79923 10.8787C4.79273 10.8252 4.77589 10.7734 4.74963 10.7262C4.71998 10.6729 4.67402 10.6282 4.58211 10.5387L1.63376 7.66697C1.32301 7.3643 1.16764 7.21297 1.14873 7.0698C1.13228 6.94523 1.17292 6.8199 1.25933 6.72868C1.35866 6.62385 1.57327 6.59248 2.0025 6.52974L6.07855 5.93397C6.20531 5.91544 6.26869 5.90617 6.32389 5.8805C6.37276 5.85778 6.41676 5.82579 6.45345 5.7863C6.49488 5.7417 6.52323 5.68427 6.57994 5.56939L8.40217 1.87775Z" stroke="#61656C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Star on GitHub
                    </NuxtLink>

                    <NuxtLink to="/docs" class="mt-3 md:mt-0 md:ml-3 bg-[#155EEF] py-3 px-5 font-sans font-semibold text-white flex items-center border-2 border-[rgba(255,255,255,0.12)] rounded-lg hover:bg-[#004EEB] transition-colors duration-200">
                        Get Started
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="max-w-screen-xl w-full px-8 flex flex-col items-center justify-center pt-8 pb-12">
            <p class="text-[#94979C] font-sans text-base">Powered by</p>
            <NuxtLink to="https://serversideup.net/" target="_blank" class="flex items-center">
                <img src="/images/logos/grey-server-side-up-logo.svg" alt="Server Side Up" class="h-12 mt-6"/>
            </NuxtLink>
        </div>
    </footer>
</template>