<template>
    <div class="mx-auto w-full max-w-[768px] flex flex-col items-center mt-16 px-4 md:mt-0">
        <h2 class="font-sans font-semibold text-3xl text-center md:text-4xl text-[#F5F5F6]">Frequently asked questions</h2>
        <p class="mt-5 font-sans text-[#94969C] text-center">Everything you need to know about getting started.</p>

        <div class="w-full py-12 md:py-16">
            <div class="flex items-start border-b border-[#1F242F] pb-8">
                <div class="flex flex-col flex-1">
                    <h3 class="font-sans font-medium text-lg md:text-xl text-[#F5F5F6]">Who started this project?</h3>
                    <p class="mt-2 text-[#94969C] font-sans" v-show="showWhoStarted">This project was originally started by <a href="https://github.com/zikaari" target="_blank" class="underline">Neek Sandhu (@zikaari)</a> in 2017. Unfortunately time became a constraint and in January 2024, the project was graciously transferred to Server Side Up to be maintained. We're very grateful for Neek Sandhu's contributions and we're excited to carry the torch forward. 🤝</p>
                </div>
                <div class="flex shrink-0 ml-6 w-6">
                    <button @click="showWhoStarted = !showWhoStarted" class="cursor-pointer">
                        <svg v-show="showWhoStarted" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#85888E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-show="!showWhoStarted" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#85888E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex items-start border-b border-[#1F242F] pb-8 mt-6">
                <div class="flex flex-col flex-1">
                    <h3 class="font-sans font-medium text-lg md:text-xl text-[#F5F5F6]">Where can I get help?</h3>
                    <p class="mt-2 text-[#94969C] font-sans" v-show="showGetHelp">If you have a quick question, feel free to throw it in our <a href="https://github.com/serversideup/amplitudejs/discussions" target="_blank" class="underline">GitHub Discussions</a> or hop on our <a href="https://serversideup.net/discord" target="_blank" class="underline">Discord community</a>. For more advanced questions and custom development, we do offer <a href="https://serversideup.net/get-help/" class="underline">professional support</a>.</p>
                </div>
                <div class="flex shrink-0 ml-6 w-6">
                    <button @click="showGetHelp = !showGetHelp" class="cursor-pointer">
                        <svg v-show="showGetHelp" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#85888E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-show="!showGetHelp" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#85888E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex items-start border-b border-[#1F242F] pb-8 mt-6">
                <div class="flex flex-col flex-1">
                    <h3 class="font-sans font-medium text-lg md:text-xl text-[#F5F5F6]">Do I need to buy the book to use this software?</h3>
                    <p class="mt-2 text-[#94969C] font-sans" v-show="showBuyBook">Nope! This is a 100% free and open-source product that you can implement into your web extensions. If you are looking for a full multi-platform web extension template that includes the amplitudejs package and a whole bunch of other helpful tutorials, <a href="https://serversideup.net/building-multi-platform-browser-extensions/" target="_blank" class="underline">check out our book</a>!</p>
                </div>
                <div class="flex shrink-0 ml-6 w-6">
                    <button @click="showBuyBook = !showBuyBook" class="cursor-pointer">
                        <svg v-show="showBuyBook" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#85888E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-show="!showBuyBook" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#85888E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex items-start border-b border-[#1F242F] pb-8 mt-6">
                <div class="flex flex-col flex-1">
                    <h3 class="font-sans font-medium text-lg md:text-xl text-[#F5F5F6]">How can I help this project?</h3>
                    <p class="mt-2 text-[#94969C] font-sans" v-show="showGetHelp">We are totally open to PRs, issues, and ideas! Feel free to visit our <a href="https://github.com/serversideup/amplitudejs" target="_blank" class="underline">GitHub repository</a> and contribute what you think would make this package better!</p>
                </div>
                <div class="flex shrink-0 ml-6 w-6">
                    <button @click="showGetHelp = !showGetHelp" class="cursor-pointer">
                        <svg v-show="showGetHelp" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#85888E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-show="!showGetHelp" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#85888E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const showWhoStarted = ref(true);
const showGetHelp = ref(false);
const showBuyBook = ref(false);
const showHelpProject = ref(false);
</script>
