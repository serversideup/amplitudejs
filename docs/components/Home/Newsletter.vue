<style>
.formkit-alert-success{
    text-align: center;
    color: white;
    margin-top: 20px;
}
</style>
<template>
    <div class="bg-[#13161B] py-12 lg:py-24">
        <div class="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center">
            <div class="w-full max-w-screen-md flex flex-col px-4 lg:px-8">
                <h2 class="font-sans text-white text-3xl text-center lg:text-left lg:text-4xl font-semibold">Sign up for our newsletter</h2>
                <p class="mt-5 font-sans text-[#94979C] text-center lg:text-left text-base lg:text-xl">Be the first to know about our latest releases and product updates.</p>
            </div>
            <form 
                action="https://app.kit.com/forms/8623325/subscriptions" 
                class="seva-form formkit-for flex-1 flex flex-col lg:flex-row items-start px-4 md:mt-8 lg:mt-0 lg:pl-0 lg:pr-8"
                method="post" 
                data-sv-form="8623325" 
                data-uid="7cfd0b9a2a" 
                data-format="inline" 
                data-version="5" 
                data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:false,&quot;url&quot;:&quot;https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" 
                min-width="400 500 600 700 800">
                    <div class="flex flex-col mr-4 mt-2 lg:mt-0">
                        <ul 
                            class="formkit-alert formkit-alert-error text-white text-center" 
                            data-element="errors" 
                            data-group="alert">
                        </ul>
                        <input 
                            type="email"
                            name="email_address"
                            aria-label="Email Address"
                            required
                            placeholder="Enter your email" 
                            class="w-full py-3 px-[14px] rounded-lg border border-[#373A41] bg-[#0C0E12] text-white placeholder:text-[#85888E] outline-none transition-colors duration-300 hover:border-[#61656C] focus:border-[#61656C] focus:ring-1 focus:ring-[#61656C]">
                        <p class="mt-[6px] font-sans text-[#94979C] text-xs lg:text-sm">Privacy first. No spam. No sharing. Just updates.</p>
                    </div>

                    <button type="submit" class="mt-5 lg:mt-0 py-3 px-5 rounded-lg bg-[#155EEF] transition-colors duration-200 hover:bg-[#004EEB] border border-[rgba(255,255,255,0.12)] font-sans font-semibold text-white inline-flex items-center w-full justify-center lg:justify-start lg:w-auto">
                        Subscribe
                    </button>
            </form>
        </div>
    </div>
</template>