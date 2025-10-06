import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
    collections: {
        docs: defineCollection({
            source: 'docs/**/{*,**/*}.md',
            type: 'page',
            schema: z.object({
                title: z.string(),
                group: z.string().optional(),
                description: z.string()
            })
        }),
        content: defineCollection(
            asSeoCollection({
                type: 'page',
                source: '**/{*,**/*}.md',
            }),
        ),
    },
})