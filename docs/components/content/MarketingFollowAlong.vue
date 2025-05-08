<template>
    <div class="w-full bg-[#151A1F]">
        <div id="amplitudejs-follow-along" class="w-full max-w-7xl mx-auto flex flex-col px-4 py-16 md:px-8">
            <div class="w-full flex flex-col items-center justify-center rounded-2xl bg-[#1D252C] px-6 py-10 md:p-16">
                <h2 class="font-sans text-4xl text-center text-[#F5F5F6] font-semibold">🚀 We're building in public</h2>
                <div class="mt-5 text-center text-xl font-sans font-normal text-[#94969C]">Follow along and get updates delivered right to your inbox.</div>
                <form action="https://app.convertkit.com/forms/6597528/subscriptions" class="seva-form formkit-form w-full" method="POST" data-sv-form="6597528" data-uid="d091df3366" data-format="inline" data-version="5" data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}' min-width="400 500 600 700 800">
                    <div data-style="clean">
                        <ul
                            class="formkit-alert formkit-alert-error"
                            data-element="errors"
                            data-group="alert">
                        </ul>
                        <div
                            data-element="fields"
                            data-stacked="false"
                            class="seva-fields formkit-fields flex flex-col w-full md:w-auto md:flex-row md:justify-center items-center mt-8">
                                <div class="formkit-field w-full md:w-auto">
                                    <input
                                        class="formkit-input mb-4 md:mb-0 md:mr-4 w-full md:w-80 text-[#F5F5F6] p-[14px] rounded-lg bg-[#0C111D] border border-[#333741] shadow-sm font-sans text-base outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 placeholder:text-[#85888E]"
                                        name="email_address"
                                        aria-label="Email Address"
                                        placeholder="Email Address"
                                        required
                                        type="email"/>
                                </div>
                                <button
                                    data-element="submit"
                                    class="formkit-submit formkit-submit w-full md:w-auto font-sans text-base font-semibold py-[14px] px-[18px] rounded-lg border border-[#155EEF] bg-[#155EEF] text-[#151A1F]">

                                    <span class="">Subscribe</span>
                                </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <section class="mx-auto max-w-[940px] flex flex-col px-6">
            <div class="grid gap-[10px] grid-cols-1 mb-16 md:grid-cols-3">
                <NuxtLink 
                    class="block w-full p-[1px] hover:rounded-lg hover:bg-gradient-to-r hover:from-[#1CE783] hover:to-[#00d4ff]"
                    :to="'https://twitter.com/serversideup'" target="_blank">
                        <div class="flex flex-col bg-[#151A1F] rounded-lg p-4 h-full">
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.78874 23.0396C5.55374 23.0396 2.53817 22.0986 0 20.4752C2.15499 20.6146 5.95807 20.2807 8.32358 18.0243C4.76508 17.8611 3.16026 15.1318 2.95094 13.9655C3.25329 14.0821 4.6953 14.2221 5.50934 13.8955C1.4159 12.8692 0.787928 9.27687 0.927477 8.18052C1.695 8.71704 2.99745 8.90365 3.50913 8.85699C-0.305207 6.12779 1.06703 2.02231 1.74151 1.1359C4.47882 4.92822 8.5812 7.05812 13.6564 7.17659C13.5607 6.75691 13.5102 6.31997 13.5102 5.87119C13.5102 2.65047 16.1134 0.0395508 19.3247 0.0395508C21.0025 0.0395508 22.5144 0.752305 23.5757 1.89239C24.6969 1.62966 26.3843 1.01462 27.2092 0.482756C26.7934 1.97566 25.4989 3.22104 24.7159 3.68263C24.7224 3.69833 24.7095 3.66686 24.7159 3.68263C25.4037 3.57859 27.2648 3.22092 28 2.72211C27.6364 3.5608 26.264 4.95528 25.1377 5.73597C25.3473 14.9776 18.2765 23.0396 8.78874 23.0396Z" fill="white"/>
                            </svg>

                            <span class="font-bold text-white text-2xl leading-[48px] my-1 font-inter">
                                Twitter
                            </span>

                            <p class="text-slate-300 text-base font-inter">
                                Follow along @serversideup or our latest updates and projects.
                            </p>
                        </div>
                </NuxtLink>

                <NuxtLink 
                    class="block w-full p-[1px] hover:rounded-lg hover:bg-gradient-to-r hover:from-[#1CE783] hover:to-[#00d4ff]"
                    :to="'https://serversideup.net/discord'" target="_blank">
                        <div class="flex flex-col bg-[#151A1F] rounded-lg p-4 h-full">
                            <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.5321 3.43706C22.6055 1.80797 20.2936 0.993424 17.8532 0.857666L17.4679 1.26494C19.6514 1.80797 21.578 2.89403 23.3761 4.38736C21.1927 3.16554 18.7523 2.351 16.1835 2.07948C15.4128 1.94373 14.7706 1.94373 14 1.94373C13.2294 1.94373 12.5872 1.94373 11.8165 2.07948C9.24771 2.351 6.80734 3.16554 4.62385 4.38736C6.42202 2.89403 8.34862 1.80797 10.5321 1.26494L10.1468 0.857666C7.70642 0.993424 5.3945 1.80797 3.46789 3.43706C1.2844 7.7813 0.12844 12.6686 0 17.6916C1.92661 19.8637 4.62385 21.2213 7.44954 21.2213C7.44954 21.2213 8.34862 20.1352 8.99083 19.1849C7.3211 18.7777 5.77982 17.8274 4.75229 16.334C5.65138 16.8771 6.55046 17.4201 7.44954 17.8274C8.6055 18.3704 9.76147 18.6419 10.9174 18.9134C11.945 19.0492 12.9725 19.1849 14 19.1849C15.0275 19.1849 16.055 19.0492 17.0826 18.9134C18.2385 18.6419 19.3945 18.3704 20.5505 17.8274C21.4495 17.4201 22.3486 16.8771 23.2477 16.334C22.2202 17.8274 20.6789 18.7777 19.0092 19.1849C19.6514 20.1352 20.5505 21.2213 20.5505 21.2213C23.3761 21.2213 26.0734 19.8637 28 17.6916C27.8716 12.6686 26.7156 7.7813 24.5321 3.43706ZM9.76147 15.248C8.47706 15.248 7.3211 14.0262 7.3211 12.5328C7.3211 11.0395 8.47706 9.81767 9.76147 9.81767C11.0459 9.81767 12.2018 11.0395 12.2018 12.5328C12.2018 14.0262 11.0459 15.248 9.76147 15.248ZM18.2385 15.248C16.9541 15.248 15.7982 14.0262 15.7982 12.5328C15.7982 11.0395 16.9541 9.81767 18.2385 9.81767C19.5229 9.81767 20.6789 11.0395 20.6789 12.5328C20.6789 14.0262 19.5229 15.248 18.2385 15.248Z" fill="white"/>
                            </svg>

                            <span class="font-bold text-white text-2xl leading-[48px] my-1 font-inter">
                                Discord
                            </span>

                            <p class="text-slate-300 text-base font-inter">
                                Chat with the maintainers and meet friendly people who share the same interests as you.
                            </p>
                        </div>
                </NuxtLink>

                <NuxtLink 
                    class="block w-full p-[1px] hover:rounded-lg hover:bg-gradient-to-r hover:from-[#1CE783] hover:to-[#00d4ff]"
                    :to="'https://github.com/serversideup/amplitudejs'" target="_blank">
                        <div class="flex flex-col bg-[#151A1F] rounded-lg p-4 h-full">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 0.0395508C6.265 0.0395508 0 6.30455 0 14.0396C0 20.2346 4.0075 25.4671 9.5725 27.3221C10.2725 27.4446 10.535 27.0246 10.535 26.6571C10.535 26.3246 10.5175 25.2221 10.5175 24.0496C7 24.6971 6.09 23.1921 5.81 22.4046C5.6525 22.0021 4.97 20.7596 4.375 20.4271C3.885 20.1646 3.185 19.5171 4.3575 19.4996C5.46 19.4821 6.2475 20.5146 6.51 20.9346C7.77 23.0521 9.7825 22.4571 10.5875 22.0896C10.71 21.1796 11.0775 20.5671 11.48 20.2171C8.365 19.8671 5.11 18.6596 5.11 13.3046C5.11 11.7821 5.6525 10.5221 6.545 9.54205C6.405 9.19205 5.915 7.75705 6.685 5.83205C6.685 5.83205 7.8575 5.46455 10.535 7.26705C11.655 6.95205 12.845 6.79455 14.035 6.79455C15.225 6.79455 16.415 6.95205 17.535 7.26705C20.2125 5.44705 21.385 5.83205 21.385 5.83205C22.155 7.75705 21.665 9.19205 21.525 9.54205C22.4175 10.5221 22.96 11.7646 22.96 13.3046C22.96 18.6771 19.6875 19.8671 16.5725 20.2171C17.08 20.6546 17.5175 21.4946 17.5175 22.8071C17.5175 24.6796 17.5 26.1846 17.5 26.6571C17.5 27.0246 17.7625 27.4621 18.4625 27.3221C21.2418 26.3838 23.6568 24.5976 25.3677 22.2149C27.0786 19.8322 27.9993 16.9729 28 14.0396C28 6.30455 21.735 0.0395508 14 0.0395508Z" fill="white"/>
                            </svg>

                            <span class="font-bold text-white text-2xl leading-[48px] my-1 font-inter">
                                Github
                            </span>

                            <p class="text-slate-300 text-base font-inter">
                                Help us squash bugs, request features, and improve the documentation.
                            </p>
                        </div>
                </NuxtLink>
            </div>

            <div class="flex flex-col items-center justify-center my-16">
                <span class="font-lato text-white mb-4">⚡️ Powered by:</span>
                <NuxtLink :to="'https://serversideup.net'">
                    <!-- <img src="/images/logos/server-side-up-footer.svg"/> -->
                </NuxtLink>
            </div>
        </section>
    </div>
</template>

<script setup>

</script>