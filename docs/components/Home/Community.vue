<template>
    <div ref="communityElement" class="max-w-screen-xl mx-auto flex flex-col px-4 md:px-8 py-8 md:py-12">
        <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="flex flex-col">
                <h2 class="text-xl font-semibold text-[#F7F7F7]">Join our community</h2>
                <p class="mt-2 font-sans text-[#94979C]">We're a community of 3,000+ members help each other level up our development skills.</p>
            </div>
            <div class="flex flex-col w-full md:w-auto md:flex-row items-center justify-center mt-8 lg:mt-0 md:space-x-3">
                <NuxtLink :to="discord.link" target="_blank" class="py-3 px-[18px] mt-4 md:mt-0 rounded-lg border border-[#373A41] transition-colors duration-200 hover:bg-[#22262F] font-sans font-semibold text-[#CECFD2] flex w-full md:w-auto md:inline-flex items-center justify-center md:justify-start order-2 md:order-1">
                    <img src="/images/logos/discord.svg" alt="discord" class="w-6 h-6 md:mr-2"/>
                    Join our Discord
                </NuxtLink>

                <NuxtLink to="https://serversideup.net/products/" class="py-3 px-[18px] rounded-lg bg-[#155EEF] hover:bg-[#004EEB] transition-colors duration-200 border-2 border-[rgba(255,255,255,0.12)] font-sans font-semibold text-white flex w-full md:w-auto md:inline-flex items-center justify-center md:justify-start order-1 md:order-2">
                    Explore our tools
                </NuxtLink>
            </div>
        </div>
        

        <div class="max-w-screen-md mx-auto py-8 md:py-16 flex flex-col w-full">
            <h4 class="mb-2 font-medium text-white font-sans">Platinum Sponsors</h4>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 gap-x-2">
                <NuxtLink to="https://sevalla.com/" target="_blank" class="p-[10px] rounded bg-[#13161B] hover:bg-[#22262F] h-32 flex items-center justify-center transition-all duration-200">
                    <img src="/images/logos/sevalla.svg" alt="Sponsor" class="w-64 md:w-full object-contain" />
                </NuxtLink>

                <NuxtLink to="https://soothingrelaxation.com/" target="_blank" class="p-[10px] rounded bg-[#13161B] hover:bg-[#22262F] h-32 flex items-center justify-center transition-all duration-200">
                    <img src="/images/logos/soothing-relaxation.png" alt="Sponsor" class="w-64 md:w-full object-contain" />
                </NuxtLink>

                <NuxtLink target="_blank" to="https://github.com/sponsors/serversideup" class="p-[10px] rounded bg-[#13161B] h-32 flex items-center justify-center text-[#94979C] font-medium font-sans hover:bg-[#22262F] transition-all duration-200">
                    Become a Sponsor
                </NuxtLink>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-y-0 gap-x-8">
            <div class="flex flex-col">
                <h4 class="mb-3 text-[#F7F7F7] font-sans text-4xl md:text-6xl font-semibold">
                  <span ref="discordNumber" :class="['transition-opacity duration-700', isCommunityVisible ? 'opacity-100' : 'opacity-0']"></span>
                </h4>
                <p class="font-semibold text-[#F7F7F7] text-lg font-sans">Active Discord Members</p>
                <p class="text-[#94979C] font-sans mt-2">We help each other through the challenges and share our knowledge when we learn something cool.</p>
            </div>
            <div class="flex flex-col">
                <h4 class="mb-3 text-[#F7F7F7] font-sans text-4xl md:text-6xl font-semibold">
                  <span ref="starsNumber" :class="['transition-opacity duration-700', isCommunityVisible ? 'opacity-100' : 'opacity-0']"></span>
                </h4>
                <p class="font-semibold text-[#F7F7F7] text-lg font-sans">Stars on GitHub</p>
                <p class="text-[#94979C] font-sans mt-2">Our community is active and growing.</p>
            </div>
            <div class="flex flex-col">
                <h4 class="mb-3 text-[#F7F7F7] font-sans text-4xl md:text-6xl font-semibold">
                  <span ref="newsletterNumber" :class="['transition-opacity duration-700', isCommunityVisible ? 'opacity-100' : 'opacity-0']"></span>
                </h4>
                <p class="font-semibold text-[#F7F7F7] text-lg font-sans">Newsletter Subscribers</p>
                <p class="text-[#94979C] font-sans mt-2">We send periodic updates what we're learning and what new tools are available. No spam. No BS.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'
const { 
    metrics,
    discord
} = useAppConfig()

// Easing function for a natural, premium feel
function easeOutQuad(t) {
    return t * (2 - t);
}

function animateCountUp(element, start, end, duration, suffix = '+') {
    const startTime = performance.now();
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);
        const value = Math.floor(start + (end - start) * eased);
        
        element.textContent = value.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = end.toLocaleString() + suffix;
        }
    }
  requestAnimationFrame(animate);
}

const communityElement = ref(null);
const discordNumber = ref(null);
const starsNumber = ref(null);
const newsletterNumber = ref(null);
const isCommunityVisible = ref(false)

useIntersectionObserver(
    communityElement,
    ([{ isIntersecting }]) => {
        if (isIntersecting && !isCommunityVisible.value) {
            isCommunityVisible.value = true
            // Discord
            animateCountUp(
                discordNumber.value,
                0,
                parseInt(metrics.discord.replace(/[^\d]/g, '')),
                1500,
                '+'
            )
            // Stars
            animateCountUp(
                starsNumber.value,
                0,
                metrics.stars,
                1500,
                'k+'
            )
            // Newsletter
            animateCountUp(
                newsletterNumber.value,
                0,
                parseInt(metrics.newsletter.replace(/[^\d]/g, '')),
                1500,
                '+'
            )
        }
    }
)
</script>