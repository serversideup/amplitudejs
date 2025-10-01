import { defineNuxtConfig } from 'nuxt'
import tailwindTypography from '@tailwindcss/typography'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '@nuxtjs/tailwindcss'
    ],
    content: {
        documentDriven: true
    },
    tailwindcss: {
        config: {
            plugins: [tailwindTypography]
        }
    }
})
