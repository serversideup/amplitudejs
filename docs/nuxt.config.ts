// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    vite: { server: { allowedHosts: ['localhost'] } },
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
      '@nuxtjs/seo',
      '@nuxt/content',
      '@nuxt/image',
      '@nuxtjs/tailwindcss',
      '@nuxt/fonts',
      '@vueuse/nuxt',
      '@nuxtjs/plausible',
      '@stefanobartoletti/nuxt-social-share'
    ],
    site: {
      url: process.env.NUXT_SITE_URL || 'https://serversideup.net/open-source/amplitudejs',
      name: process.env.NUXT_SITE_NAME || 'AmplitudeJS',
      env: process.env.NUXT_SITE_ENV || 'production',
      indexable: process.env.NUXT_SITE_ENV === 'production',
      trailingSlash: true
    },
    image: {
      ipx: {
        modifiers: {
          format: 'webp'
        }
      }
    },
    sitemap: {
      sitemaps: {
        pages: {
          // extend the nuxt:pages app source
          includeAppSources: true,
        },
      },
    },
    plausible: {
      domain: process.env.NUXT_SITE_URL?.replace('https://', '') || 'serversideup.net/open-source/amplitudejs',
      enabled: process.env.PLAUSIBLE_ENABLED === 'true',
      apiHost: 'https://a.521dimensions.com'
    },
    socialShare: {
      baseUrl: process.env.NUXT_SITE_URL || 'https://serversideup.net/open-source/amplitudejs',
    },
    runtimeConfig: {
      public: {
        mode: process.env.NUXT_SITE_ENV || 'production',
      }
    },
    content: {
      build: {
        markdown: {
          highlight: {
            // OR
            theme: {
              // Default theme (same as single string)
              default: 'github-dark',
              // Theme used if `html.dark`
              dark: 'github-dark',
              // Theme used if `html.sepia`
              sepia: 'monokai'
            },
            langs: [
              'javascript',
              'typescript',
              'css',
              'html',
              'json'
            ]        
          }
        }
      }
    },
  })